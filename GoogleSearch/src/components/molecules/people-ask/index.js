import { useStyles } from './styles';
import {
  Box,
  Typography,
  ExpandMoreIcon,
  Accordion,
  AccordionSummary,
} from '../../atoms';

const questions = [
  'What is a Google search results page?',
  'What do Google search results mean?',
  'What is SERP SEO?',
  'What is a snippet in Google?',
];

const PeopleAsk = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.title}>
        <Typography variant='h6' color='secondary'>
          People also ask
        </Typography>
      </Box>

      {questions.map((question, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant='h6' className={classes.question}>
              {question}
            </Typography>
          </AccordionSummary>
        </Accordion>
      ))}
    </Box>
  );
};

export default PeopleAsk;
