import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
  createStyles({
    content: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logo: {
      marginRight: '17px',
    },
    search: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      '& form': {
        minWidth: '700px',
      },
    },
  })
);
