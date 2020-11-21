import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
  createStyles({
    content: {
      marginBottom: '-20px',
      backgroundColor: theme.palette.common.white,
      padding: '5px 0 5px 130px',
    },
  })
);
