import { Tabs as T } from '@material-ui/core';

const Tabs = ({ children, ...rest }) => {
  return <T {...rest}>{children}</T>;
};

export default Tabs;
