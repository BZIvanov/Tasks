import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
  createStyles({
    link: {
      margin: '20px 10px',
      '& > a': {
        textDecoration: 'none',
      },
    },
    url: {
      color: theme.palette.success.main,
    },
  })
);
