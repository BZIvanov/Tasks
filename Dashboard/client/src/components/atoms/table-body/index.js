import React from 'react';
import { TableBody as TB } from '@material-ui/core';

const TableBody = ({ children, ...rest }) => {
  return <TB {...rest}>{children}</TB>;
};

export default TableBody;
