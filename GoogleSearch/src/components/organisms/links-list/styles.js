import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
  createStyles({
    wrapper: {
      backgroundColor: theme.palette.common.white,
    },
    content: {
      marginLeft: '120px',
      paddingTop: '25px',
      maxWidth: '700px',
    },
  })
);
