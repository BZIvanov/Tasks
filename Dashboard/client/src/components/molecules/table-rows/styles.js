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
  })
);
