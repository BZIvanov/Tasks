import { IconButton as IB } from '@material-ui/core';

const IconButton = ({ children, ...rest }) => {
  return <IB {...rest}>{children}</IB>;
};

export default IconButton;
