import React from 'react';
import { TableRow as TR } from '@material-ui/core';

const TableRow = ({ children, ...rest }) => {
  return <TR {...rest}>{children}</TR>;
};

export default TableRow;
