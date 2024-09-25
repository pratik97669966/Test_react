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
    searchBar: {
        marginBottom: theme.spacing(2),
        height: '45px'
    },
    chipContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: theme.spacing(1),
        padding: theme.spacing(1),
    },
    chip: {
        cursor: 'pointer',
        backgroundColor: '#FFFFFF',
        color: '#357A7B'
    },
    chipSelected: {
        backgroundColor: '#ECF4F4',
        color: '#357A7B',
        borderColor: '#A8A8A8',
    },
    noteContainer: {
        marginTop: theme.spacing(2),
        flexGrow: 1,

    },
    notePaper: {
        padding: theme.spacing(2),
        background: '#ECF4F4',
        borderRadius: 6,
        marginBottom: '20px',
        border: '1px solid #EAEAEA',
    },
    noteText: {
        marginTop: theme.spacing(1),
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
}));

export default useStyles;