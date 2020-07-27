import React from 'react';
import { TablePagination as TP } from '@material-ui/core';
import { TABLE_PAGINATION } from '../../../constants';

const TablePagination = ({ children, ...rest }) => {
  return (
    <TP component="div" rowsPerPageOptions={TABLE_PAGINATION} {...rest}>
      {children}
    </TP>
  );
};

export default TablePagination;
