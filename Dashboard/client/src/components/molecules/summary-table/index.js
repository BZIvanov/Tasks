import React, { useState } from 'react';
import { useStyles } from './styles';
import { TableHeader } from '../../molecules';
import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
} from '../../atoms';
import { columns } from './fixtures';

const SummaryTable = ({ rows }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHeader columns={columns} />
          <TableBody>
            {rows &&
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, rowIndex) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code + '' + rowIndex}
                      className={classes[row['robot']]}
                    >
                      {columns.map((column, colIndex) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id + '' + rowIndex + colIndex}
                            align={column.align}
                          >
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default SummaryTable;
