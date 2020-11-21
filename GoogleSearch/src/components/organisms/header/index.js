import { useStyles } from './styles';
import { SearchForm, Icons } from '../../molecules';
import { Logo, Box } from '../../atoms';
import GoogleIcon from '../../../assets/google-logo.png';

const Header = ({ onSearch }) => {
  const classes = useStyles();

  return (
    <Box className={classes.content}>
      <Box className={classes.search}>
        <Box className={classes.logo}>
          <Logo src={GoogleIcon} alt='google company' />
        </Box>
        <SearchForm onSearch={onSearch} />
      </Box>
      <Box>
        <Icons />
      </Box>
    </Box>
  );
};

export default Header;
