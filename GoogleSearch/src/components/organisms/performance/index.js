import { useStyles } from './styles';
import { Typography, Box } from '../../atoms';

const Performance = ({ results, speed }) => {
  const classes = useStyles();

  return (
    <Box className={classes.content}>
      {speed > 0 && (
        <Typography variant='subtitle2' color='secondary'>
          About {results} results ({speed / 1000} seconds)
        </Typography>
      )}
    </Box>
  );
};

export default Performance;
