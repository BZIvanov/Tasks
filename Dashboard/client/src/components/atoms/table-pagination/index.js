import React from 'react';
import { TablePagination as TP } from '@material-ui/core';

const TablePagination = ({ children, ...rest }) => {
  return (
    <TP component="div" rowsPerPageOptions={[10, 25, 100]} {...rest}>
      {children}
    </TP>
  );
};

export default TablePagination;
