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
    field: {
        marginBottom: '10px',
        '& .MuiInputBase-root': {
            height: '50px', // Set the height to 74px
            fontSize: '14px', // Set the inside text size to 14px
        },
        '& .MuiInputAdornment-root': {
            marginTop: '0px', // Ensure icon aligns correctly
        },
    },
    iconAddMember: {
        color: '#5F6368',
    },
    label: {
        fontSize: '16px',
        color: '#78879E',
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
    title: {
        alignItems: 'center',
        color: '#0F2951',
    },
}));

export default useStyles;
