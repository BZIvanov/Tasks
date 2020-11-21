import { useStyles } from './styles';
import { Link, PeopleAsk } from '../../molecules';
import { Typography, Box } from '../../atoms';

const LinksList = ({ links }) => {
  const classes = useStyles();

  if (links.length === 0) {
    return (
      <Box className={classes.content}>
        <Typography variant='h5'>No results</Typography>
      </Box>
    );
  }

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.content}>
        <Link key={links[0].idDrink} link={links[0]} />
        <PeopleAsk />
        {links
          .filter((_, index) => index > 0)
          .map((link, index) => (
            <Link key={link.idDrink} link={link} moreInfo={index % 3 === 0} />
          ))}
      </Box>
    </Box>
  );
};

export default LinksList;
