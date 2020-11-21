import { useStyles } from './styles';

const Logo = ({ src, alt }) => {
  const classes = useStyles();

  return <img src={src} alt={alt} className={classes.logo} />;
};

export default Logo;
