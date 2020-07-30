import React from 'react';
import { Button as BT } from '@material-ui/core';

const Button = ({ children, ...rest }) => {
  return <BT {...rest}>{children}</BT>;
};

export default Button;
