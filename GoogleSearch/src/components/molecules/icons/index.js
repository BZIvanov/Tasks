import { useStyles } from './styles';
import {
  AppsIcon,
  FormatBoldRoundedIcon,
  NotificationsIcon,
  Box,
} from '../../atoms';

const Icons = () => {
  const classes = useStyles();

  return (
    <Box className={classes.icons}>
      <Box className={classes.icon}>
        <AppsIcon color='secondary' fontSize='inherit' />
      </Box>
      <Box className={classes.icon}>
        <NotificationsIcon color='secondary' fontSize='inherit' />
      </Box>
      <Box className={classes.icon}>
        <FormatBoldRoundedIcon color='secondary' fontSize='inherit' />
      </Box>
    </Box>
  );
};

export default Icons;
