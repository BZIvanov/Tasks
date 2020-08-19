import React from 'react';
import { useStyles } from './styles';
import { TableHeader, TableRows } from '../../molecules';
import {
  Paper,
  TableContainer,
  Table,
  TablePagination,
  Typography,
} from '../../atoms';
import { columns } from './fixtures';

const DetailsTable = ({
  type,
  rows,
  page,
  onSetPage,
  rowsPerPage,
  onSetRowsPerPage,
  totalResults,
}) => {
  const classes = useStyles();

  const handleChangePage = (_, newPage) => {
    onSetPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    onSetRowsPerPage(+event.target.value);
    onSetPage(0);
  };

  return (
    <Paper className={classes.root}>
      <Typography variant="h5" color="secondary">
        {type}
      </Typography>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHeader columns={columns[type]} />
          <TableRows columns={columns[type]} rows={rows} />
        </Table>
      </TableContainer>
      <TablePagination
        count={parseInt(totalResults)}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default DetailsTable;
