import { useStyles } from './styles';
import { Typography, Box } from '../../atoms';

const MAX_TEXT_LENGTH = 180;

const Link = ({ link, moreInfo }) => {
  const classes = useStyles();

  return (
    <Box className={classes.link}>
      <a href={link.strDrinkThumb} target='_blank' rel='noreferrer'>
        <Typography variant='h6'>
          {link.strDrink} {link.strMeasure1} {link.strGlass} -{' '}
          {link.strAlcoholic}
        </Typography>
        <Typography variant='subtitle2' className={classes.url}>
          {link.strDrinkThumb}
        </Typography>
        <Typography variant='subtitle2' color='secondary'>
          {link.dateModified} -{' '}
          {link.strInstructions.length > MAX_TEXT_LENGTH
            ? link.strInstructions.substring(0, MAX_TEXT_LENGTH) + ' ...'
            : link.strInstructions}
        </Typography>
        {moreInfo && (
          <Typography variant='subtitle2'>
            {link.strIngredient1} &bull; {link.strIngredient2} &bull;{' '}
            {link.strIngredient3}
          </Typography>
        )}
      </a>
    </Box>
  );
};

export default Link;
