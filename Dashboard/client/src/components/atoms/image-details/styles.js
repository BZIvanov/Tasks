import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    details: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& img': {
        width: '50px',
        border: '1px solid #A3B9C9',
        marginBottom: '5px',
      },
    },
  })
);
