import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: 'relative',
    },
    searchControls: {
      display: 'flex',
      justifyContent: 'center',
      margin: '20px 0',
      '& .flag-select': {
        marginRight: '20px',
      },
    },
    loading: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      zIndex: 20,
    },
  })
);
