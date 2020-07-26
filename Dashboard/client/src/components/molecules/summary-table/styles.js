import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 1040,
    },
    products: {
      backgroundColor: '#ADBCA5',
    },
    filters: {
      backgroundColor: '#E8B9AB',
    },
    banners: {
      backgroundColor: '#E09891',
    },
    searches: {
      backgroundColor: '#CB769E',
    },
    baskets: {
      backgroundColor: '#8C5F66',
    },
    reviews: {
      backgroundColor: '#434A42',
    },
  })
);
