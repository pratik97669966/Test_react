import React, { useEffect, useState } from 'react';
import { Box, Button, Chip, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Paper, Tab, Tabs, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import moment from 'moment-timezone';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

import doc_walk_image from '../../../../assets/Icons/doc_walk_image.svg';
import ic_edit_change from '../../../../assets/Icons/ic_edit_change.svg';
import { PatientData } from '../../../../redux/dtos/PatientData';
import { SelectedDoctor } from '../../../../redux/dtos/SelectedDoctor';
import { UserServiceLocation } from '../../../../redux/dtos/UserServiceLocation';
import { SelfData } from '../../../../redux/opdDtos/SelfData';
import { BookingRequest, SlotSummary } from '../../../../redux/opdDtos/SlotDataDto';
import { getDoctorSlot, getPaymentCharges, getRazorPayOrderId } from '../../../../services/api/DoctorAPI';
import { getDefaultSnack } from '../../../../utils/SnackbarHelper';
import useStyles from './SelectSlotStyles';

const SelectSlot: React.FC = () => {

    const classes = useStyles();
    const history = useHistory();
    const { successSnack, failSnack, warningSnack } = getDefaultSnack(useSnackbar().enqueueSnackbar);
    const [selectedDate, setSelectedDate] = useState<string>(moment.tz('Asia/Kolkata').startOf('day').toISOString());
    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedSlot, setSelectedSlot] = useState<BookingRequest>();
    const [mainSlotSummary, setMainSlotSummary] = useState<SlotSummary[]>([]);
    const [isAppointmentBooked, setIsAppointmentBooked] = useState(false);
    const selfDataString = localStorage.getItem('selfData');
    const selfData: SelfData | null = selfDataString ? JSON.parse(selfDataString) : null;
    const selectedFamilyMemberString = localStorage.getItem('selected-family-member');
    const selectedFamilyMember: PatientData | null = selectedFamilyMemberString ? JSON.parse(selectedFamilyMemberString) : null;
    const selectedAddressString = localStorage.getItem('selected-address');
    const selectedAddress: UserServiceLocation | null = selectedAddressString ? JSON.parse(selectedAddressString) : null;
    const [visibleSections, setVisibleSections] = useState<Record<number, boolean>>({});
    const selectedDoctorString = localStorage.getItem('selected-doctor');
    const selectedDoctor: SelectedDoctor | null = selectedDoctorString ? JSON.parse(selectedDoctorString) : null;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        if (selfData != null && selectedDoctor != null) {
            getPaymentCharges(selfData?.mobileNumber + '', selectedDoctor?.doctorId)
                .then((response) => {
                    localStorage.setItem('consultation-charges', response.data.consultationCharges);
                })
                .catch((error: any) => {

                });
            const payload = {
                slotDateTime: selectedDate,
                doctorId: selectedDoctor?.doctorId,
            };
            getDoctorSlot(payload)
                .then((response) => {
                    const filteredSlots = response.data.filter((slot: SlotSummary) => slot.mainSlotInfoWithRequest.onlineBookingRequests.length > 0);
                    setMainSlotSummary(filteredSlots);
                })
                .catch(error => {
                    if (error.response && error.response.status === 412) {
                        failSnack('No slots available for selected date');
                    } else {
                        console.error(error);
                        failSnack('An error occurred. Please try again.');
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [selectedDate]);

    const handleBackClick = () => {
        history.goBack();
    };

    const handleDownloadApp = () => {
        window.open('https://onelink.to/sut3zp');
    };

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        if (newValue == 0) {
            setSelectedDate(moment.tz('Asia/Kolkata').startOf('day').toISOString());

        } else {
            setSelectedDate(moment.tz('Asia/Kolkata').startOf('day').add(1, 'day').toISOString());
        }
        setMainSlotSummary([]);
        setSelectedTab(newValue);
    };

    const handleSlotSelect = (slot: BookingRequest, mainSlotId: string, mainSlotInfoId: string) => {
        if (checkSlotIsAvailable(slot)) {
            localStorage.setItem('selected-micro-slot', JSON.stringify(slot));
            localStorage.setItem('selected-slot-summary-id', mainSlotId);
            localStorage.setItem('selected-main-slot-id', mainSlotInfoId);
            history.push('/tearms-and-condition');
        }
    };
    const checkSlotIsAvailable = (slot: BookingRequest) => {
        if (slot.bookingStatus == 'CANCELLED') {
            return false;
        } else if (slot.bookingStatus == 'YET_TO_OPEN') {
            return false;
        } else if (slot.bookingStatus == 'CLOSED') {
            return false;
        } else if (slot.slotFilled == true) {
            return false;
        } else {
            return true;
        }
    };
    const goToPatientEdit = () => {
        history.push('/update-family-member');
    };
    const goToAddressEdit = () => {
        history.push('/update-choose-address');
    };
    const viewAppointment = () => {
        setIsAppointmentBooked(false);
        history.push('/booking-details');
    };
    const toggleSlotSelector = (index: number) => {
        setVisibleSections(prevState => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };
    return (
        <div className={classes.centerScreen}>
            <Container className={classes.container}>
                <div>
                    <Grid container direction="column">
                        <Grid item>
                            <Grid container alignItems="center">
                                <Grid item>
                                    <IconButton onClick={handleBackClick}>
                                        <ArrowBackIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6" className={classes.title}>Select Slot</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <div className={classes.patientInfo}>
                                <Grid container direction="column" spacing={1}>
                                    <Grid item>
                                        <Grid container justifyContent="space-between" alignItems="center">
                                            <Grid item>
                                                <Typography style={{ color: '#374151', fontSize: '12px', padding: '0px', margin: 0 }}>Patient Name</Typography>
                                            </Grid>
                                            <Grid item>
                                                <img onClick={goToPatientEdit} src={ic_edit_change} style={{ cursor: 'pointer' }} alt="change" />
                                            </Grid>
                                        </Grid>
                                        <Typography style={{ textAlign: 'start', color: '#000000', fontStyle: 'bold', fontSize: '14px', padding: '0px', margin: 0 }} variant="h6">{`${selectedFamilyMember?.firstName} ${selectedFamilyMember?.lastName}`}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Grid container justifyContent="space-between" alignItems="center">
                                            <Grid item>
                                                <Typography style={{ color: '#374151', fontSize: '12px', padding: '0px', margin: 0 }}>Address</Typography>
                                            </Grid>
                                            <Grid item>
                                                <img onClick={goToAddressEdit} src={ic_edit_change} style={{ cursor: 'pointer' }} alt="change" />
                                            </Grid>
                                        </Grid>
                                        <Typography style={{ textAlign: 'start', color: '#000000', fontStyle: 'bold', fontSize: '14px', padding: '0px', margin: 0 }} variant="h5">{selectedAddress?.address}</Typography>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <div className={classes.slotMainCard} style={{ height: 'auto', overflow: 'hidden' }}>
                    <Typography variant="h6" className={classes.sectionTitle}>Doctor Home Visit Slot</Typography>
                    <Tabs
                        value={selectedTab}
                        onChange={handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Today" />
                        <Tab label="Tomorrow" />
                    </Tabs>
                    {loading ? (
                        <Grid item style={{ marginTop: '20px' }}>
                            <ClipLoader size={50} color="#123abc" loading={loading} />
                        </Grid>
                    ) : (
                        <div className={classes.slotContainer}>
                            {mainSlotSummary.map((mainSlotSummaryData, index) => (
                                <div className={classes.subSlotCardWithBorder} key={mainSlotSummaryData.slotSummaryId}>
                                    <div onClick={() => toggleSlotSelector(index)} style={{ display: 'flex', background: '#ECF4F4', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Typography variant="h6" className={classes.tabsSection}>
                                            {`Start time (${getTimeFromSeconds(mainSlotSummaryData.mainSlotInfoWithRequest.opdStartTimeSecsFromMidnight)}-${getTimeFromSeconds(mainSlotSummaryData.mainSlotInfoWithRequest.opdEndTimeSecsFromMidnight)})`}
                                        </Typography>
                                        <IconButton >
                                            {visibleSections[index] ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                                        </IconButton>
                                    </div>
                                    {!visibleSections[index] && (
                                        <SlotSelector
                                            slots={mainSlotSummaryData.mainSlotInfoWithRequest.onlineBookingRequests}
                                            mainSlotId={mainSlotSummaryData.slotSummaryId}
                                            mainSlotInfoId={mainSlotSummaryData.mainSlotInfoWithRequest.id}
                                            onSelect={handleSlotSelect}
                                            selectedSlot={selectedSlot ? selectedSlot : null}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
};

interface SlotSelectorProps {
    slots: (BookingRequest[]);
    mainSlotId: string;
    mainSlotInfoId: string;
    onSelect: (slot: BookingRequest, mainSlotId: string, mainSlotInfoId: string) => void;
    selectedSlot: BookingRequest | null;
}
const getTimeFromSeconds = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const amPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedTime = `${formattedHours}:${formattedMinutes} ${amPm}`;
    return formattedTime;
};
const SlotSelector: React.FC<SlotSelectorProps> = ({ slots, mainSlotId, mainSlotInfoId, onSelect, selectedSlot }) => {
    const classes = useStyles();
    const checkSlotIsAvailable = (slot: BookingRequest) => {
        if (slot.bookingStatus == 'CANCELLED') {
            return false;
        } else if (slot.bookingStatus == 'YET_TO_OPEN') {
            return false;
        } else if (slot.bookingStatus == 'CLOSED') {
            return false;
        } else if (slot.slotFilled == true) {
            return false;
        } else {
            return true;
        }
    };

    return (
        <Grid container spacing={2} className={classes.slotContainer}>
            {slots.map((slot, index) => (
                <Grid item xs={4} key={index}>
                    <div
                        style={{ fontSize: '12px' }}
                        className={`${classes.slot} ${!checkSlotIsAvailable(slot) ? classes.selected : classes.unselected}`}
                        onClick={() => onSelect(slot, mainSlotId, mainSlotInfoId)}
                    >
                        {`${getTimeFromSeconds(slot.startTime)}`}
                    </div>
                </Grid>
            ))}
        </Grid>
    );
};

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

const TabPanel: React.FC<TabPanelProps> = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
            style={{ height: '300px', overflowY: 'auto' }}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </div>
    );
};

export default SelectSlot;
