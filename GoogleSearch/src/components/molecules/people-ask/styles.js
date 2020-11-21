import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      '& .MuiAccordionSummary-root': {
        minHeight: '25px',
      },
      '& .MuiAccordionSummary-content': {
        margin: '6px 0',
      },
      '& .MuiIconButton-root': {
        padding: '8px 12px',
      },
    },
    title: {
      backgroundColor: 'white',
      boxShadow: theme.shadows['1'],
      padding: '10px 15px',
    },
    question: {
      fontSize: theme.typography.pxToRem(17),
      fontWeight: theme.typography.fontWeightBold,
    },
  })
);
