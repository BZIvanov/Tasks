import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: 'relative',
    },
    searchControls: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      margin: '20px 0',
      '& .MuiFormControl-root': {
        marginLeft: '20px',
        marginRight: '20px',
      },
    },
    loading: {
      position: 'absolute',
      top: 'calc(50% + 50px)',
      left: '50%',
      zIndex: 20,
    },
    formControl: {
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: '16px',
    },
  })
);
