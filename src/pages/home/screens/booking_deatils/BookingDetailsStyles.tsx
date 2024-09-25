import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        maxWidth: '430px',
        minHeight: 'auto',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '80vh',
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
        marginBottom: '10px',
        borderRadius: 6,
        border: '1px solid #EAEAEA',
    },
    saveButton: {
        marginTop: '20px',
        borderRadius: '20px',
        bottom: theme.spacing(2),
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        background: '#357A7B',
    },
}));

export default useStyles;
