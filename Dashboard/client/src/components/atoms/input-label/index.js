import React from 'react';
import { InputLabel as IL } from '@material-ui/core';

const InputLabel = ({ children, ...rest }) => {
  return <IL {...rest}>{children}</IL>;
};

export default InputLabel;
