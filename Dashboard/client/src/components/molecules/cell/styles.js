import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    cell: {
      padding: '5px',
      border: '1px solid lightgrey',
      fontSize: 12,
    },
    list: {
      margin: 0,
      padding: 0,
      display: 'flex',
      '& li': {
        listStyleType: 'none',
        margin: '0 4px',
      },
    },
    timeline: {
      justifyContent: 'center',
    },
    count: {},
    date: {
      color: '#243335',
    },
    green: {
      border: '2px solid green',
      padding: '1px',
    },
    red: {
      border: '2px solid red',
      padding: '1px',
    },
    none: {
      border: '2px solid transparent',
      padding: '1px',
    },
    error: {
      backgroundColor: 'red',
    },
  })
);
