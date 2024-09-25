import React, { useEffect, useState } from 'react';
import { Avatar, Button, Container, Grid, IconButton, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom';

import { PatientData } from '../../../../redux/dtos/PatientData';
import { SelfData } from '../../../../redux/opdDtos/SelfData';
import { getFamilyMemberByMobileNumber, getSelfData } from '../../../../services/api/DoctorAPI';
import useStyles from './UpdateFamilyMemberStyles';

interface FamilyMemberCardProps {
    name: string;
    isAddButton?: boolean;
    selected?: boolean;
    onClick?: () => void;
}

const FamilyMemberCard: React.FC<FamilyMemberCardProps> = ({ name, isAddButton, selected, onClick }) => {
    const classes = useStyles();

    return (
        <div
            className={`${classes.card} ${selected ? classes.selectedCard : ''}`}
            onClick={onClick}
        >
            <div className={classes.cardContent}>
                <Avatar className={classes.avatar}>
                    {isAddButton ? <AddIcon /> : name.charAt(0)}
                </Avatar>
                <Typography className={`${classes.cardText} ${isAddButton ? classes.addText : ''}`}>
                    {isAddButton ? 'Add Family Member' : name}
                </Typography>
            </div>
        </div>
    );
};

const UpdateFamilyMember = () => {
    const classes = useStyles();
    const history = useHistory();
    const selfDataString = localStorage.getItem('selfData');
    const selfData: SelfData | null = selfDataString ? JSON.parse(selfDataString) : null;

    const [familyMembers, setFamilyMembers] = useState<PatientData[]>([]);

    const [selectedFamilyMember, setSelectedFamilyMember] = useState<PatientData>();

    React.useEffect(() => {
        if (selfData != null) {
            getFamilyMemberByMobileNumber(selfData?.mobileNumber)
                .then((response) => {
                    setSelectedFamilyMember(familyMembers[0]);
                    setFamilyMembers(response.data);
                })
                .catch(error => {
                    console.error('Error fetching clinics:', error);
                });
        }
    }, []);

    const handleBackClick = () => {
        history.goBack();
    };

    const handleCardClick = (index: number) => {
        setFamilyMembers(familyMembers.map((member, i) => ({
            ...member,
            selected: i === index,
        })));
        setSelectedFamilyMember(familyMembers[index]);
    };

    const handleAddClick = () => {
        history.push('/add-family-member');
    };

    const goToSelectComplaint = () => {
        localStorage.setItem('selected-family-member', JSON.stringify(selectedFamilyMember));
        history.goBack();
    };

    return (
        <div className={classes.centerScreen}>
            <Container className={classes.container}>
                <div className={classes.scrollableGrid}>
                    <Grid container alignItems="center" style={{ marginBottom: '10px' }}>
                        <Grid item>
                            <IconButton onClick={handleBackClick}>
                                <ArrowBackIcon />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6" className={classes.title}>Booking for</Typography>
                        </Grid>
                    </Grid>
                    <div className={classes.addFamilyMembersContainer}>
                        <FamilyMemberCard name="Add Family Member" isAddButton onClick={handleAddClick} />
                    </div>
                    <div className={classes.familyMembersContainer}>
                        {familyMembers.map((member, index) => (
                            <FamilyMemberCard
                                key={index}
                                name={`${member.firstName} ${member.lastName}`}
                                selected={member.selected}
                                onClick={() => handleCardClick(index)}
                            />
                        ))}
                    </div>
                </div>
                <Button variant="contained" color="primary" disabled={!selectedFamilyMember} onClick={goToSelectComplaint} className={classes.nextButton}>Next</Button>
            </Container>
        </div>
    );
};

export default UpdateFamilyMember;
