import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        maxWidth: '430px',
        minHeight: 'auto',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '90vh',
        padding: theme.spacing(2),
        boxSizing: 'border-box',
        marginBottom: '42px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        borderRadius: '20px',
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
        scrollbarWidth: 'none',
    },
    centerScreen: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: '20px',
        paddingBottom: theme.spacing(2),
        height: '100vh',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
        scrollbarWidth: 'none',
        [theme.breakpoints.down('sm')]: {
            padding: '0',
            alignItems: 'flex-start',
        },
    },
    subSlotCard: {
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
        scrollbarWidth: 'none',
    },
    nextButton: {
        marginTop: '20px',
        borderRadius: '20px',
        bottom: theme.spacing(2),
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        background: '#357A7B',
    },
    title: {
        alignItems: 'center',
        color: '#0F2951',
    },
    patientInfo: {
        padding: '10px',
        borderRadius: 6,
        border: '1px solid #EAEAEA',
    },
    slotMainCard: {
        marginTop: '8px',
        borderRadius: 6,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
        scrollbarWidth: 'none',
    },
    subSlotCardWithBorder: {
        marginTop: '8px',
        borderRadius: 6,
        border: '1px solid #EAEAEA',
        display: 'flex',
        flexDirection: 'column',

    },
    sectionTitle: {
        background: '#ECF4F4',
        textAlign: 'start',
        fontSize: '14px',
        padding: '10px',
    },
    tabsSection: {
        width: '100%',
        background: '#ECF4F4',
        textAlign: 'start',
        fontSize: '14px',
        padding: '10px',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
        scrollbarWidth: 'none',
    },
    fee: {
        marginTop: theme.spacing(2),
        textAlign: 'center',
        background: '#ECF4F4',
        fontSize: '14px',
        padding: '10px',

    },
    slotContainer: {
        maxHeight: '100%',
        padding: 10,
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
        scrollbarWidth: 'none',
    },
    slot: {
        paddingTop: '5px',
        paddingBottom: '5px',
        paddingLeft: '10px',
        paddingRight: '10px',
        textAlign: 'center',
        border: '1px solid',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s, border-color 0.3s',
    },
    selected: {
        borderRadius: '20px',
        borderColor: '#A8A8A8',
        backgroundColor: '#ECF4F4',
        color: '#357A7B',
    },
    unselected: {
        borderRadius: '20px',
        borderColor: '#A8A8A8',
        backgroundColor: '#FFFFFF',
        color: '#357A7B',
    },
}));

export default useStyles;
