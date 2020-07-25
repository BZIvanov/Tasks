import React from 'react';
import { Table as T } from '@material-ui/core';

const Table = ({ children, ...rest }) => {
  return <T {...rest}>{children}</T>;
};

export default Table;
