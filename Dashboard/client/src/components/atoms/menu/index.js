import React from 'react';
import { Menu as M } from '@material-ui/core';

const Menu = ({ children, ...rest }) => {
  return <M {...rest}>{children}</M>;
};

export default Menu;
