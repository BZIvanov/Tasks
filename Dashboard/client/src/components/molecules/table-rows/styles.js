import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    Product: {
      backgroundColor: '#ADBCA5',
    },
    Filter: {
      backgroundColor: '#E8B9AB',
    },
    Banner: {
      backgroundColor: '#E09891',
    },
    SearchResult: {
      backgroundColor: '#CB769E',
    },
    BasketRecommendation: {
      backgroundColor: '#8C5F66',
    },
    Review: {
      backgroundColor: '#434A42',
    },
    cell: {
      padding: '5px',
      border: '1px solid lightgrey',
      fontSize: 12,
    },
    list: {
      margin: 0,
      padding: 0,
      '& li': {
        listStyleType: 'none',
      },
    },
  })
);
