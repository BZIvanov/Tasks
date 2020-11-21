import { AccordionSummary as AcdnSmry } from '@material-ui/core';

const AccordionSummary = ({ children, ...rest }) => {
  return <AcdnSmry {...rest}>{children}</AcdnSmry>;
};

export default AccordionSummary;
