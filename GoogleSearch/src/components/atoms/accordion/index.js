import { Accordion as Acdn } from '@material-ui/core';

const Accordion = ({ children, ...rest }) => {
  return <Acdn {...rest}>{children}</Acdn>;
};

export default Accordion;
