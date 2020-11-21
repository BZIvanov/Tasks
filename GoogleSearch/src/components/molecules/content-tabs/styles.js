import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
  createStyles({
    root: {},
    tab: {
      textTransform: 'none',
      letterSpacing: '0',
      minWidth: '80px',
      color: theme.palette.secondary.main,
    },
    tabs: {
      '& .MuiTabs-indicator': {
        display: ({ simple }) => (simple ? 'none' : 'block'),
      },
    },
  })
);
