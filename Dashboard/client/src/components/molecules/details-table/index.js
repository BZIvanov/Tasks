import React, { useState } from 'react';
import { useStyles } from './styles';
import { TableHeader, TableRows } from '../../molecules';
import { Paper, TableContainer, Table, TablePagination } from '../../atoms';
import { columns } from './fixtures';
import { TABLE_PAGINATION } from '../../../constants';

const DetailsTable = ({ rows }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(TABLE_PAGINATION[0]);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHeader columns={columns} />
          <TableRows
            columns={columns}
            rows={rows.rows.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            )}
          />
        </Table>
      </TableContainer>
      <TablePagination
        count={rows.rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default DetailsTable;
