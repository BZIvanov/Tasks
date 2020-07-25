import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: 'relative',
    },
    loading: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      zIndex: 20,
    },
  })
);
