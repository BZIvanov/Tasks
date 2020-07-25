import React from 'react';
import { TableCell as TC } from '@material-ui/core';

const TableCell = ({ children, ...rest }) => {
  return <TC {...rest}>{children}</TC>;
};

export default TableCell;
