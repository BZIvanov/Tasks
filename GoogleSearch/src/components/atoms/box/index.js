import { Box as B } from '@material-ui/core';

const Box = ({ children, ...rest }) => {
  return <B {...rest}>{children}</B>;
};

export default Box;
