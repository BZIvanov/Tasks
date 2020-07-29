import React from 'react';
import { FormControl as FC } from '@material-ui/core';

const FormControl = ({ children, ...rest }) => {
  return <FC {...rest}>{children}</FC>;
};

export default FormControl;
