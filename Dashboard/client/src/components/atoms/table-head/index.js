import React from 'react';
import { TableHead as TH } from '@material-ui/core';

const TableHead = ({ children, ...rest }) => {
  return <TH {...rest}>{children}</TH>;
};

export default TableHead;
