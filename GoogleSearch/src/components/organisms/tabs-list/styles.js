import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    tabs: {
      display: 'flex',
      justifyContent: 'space-between',
      marginLeft: '120px',
      maxWidth: '700px',
    },
  })
);
