import { Paper as P } from '@material-ui/core';

const Paper = ({ children, ...rest }) => {
  return <P {...rest}>{children}</P>;
};

export default Paper;
