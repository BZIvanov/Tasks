import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
  createStyles({
    icons: {
      fontSize: '25px',
      display: 'flex',
      alignItems: 'center',
      '& > div:last-of-type': {
        fontSize: '40px',
        lineHeight: '40px',
      },
    },
    icon: {
      margin: '5px',
      '&:hover': {
        cursor: 'pointer',
      },
    },
  })
);
