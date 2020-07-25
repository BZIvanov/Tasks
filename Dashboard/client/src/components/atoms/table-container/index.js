import React from 'react';
import { TableContainer as TC } from '@material-ui/core';

const TableContainer = ({ children, ...rest }) => {
  return <TC {...rest}>{children}</TC>;
};

export default TableContainer;
