import React from 'react';
import { useStyles } from './styles';
import { TableBody, TableRow, TableCell } from '../../atoms';

const TableRows = ({ columns, rows }) => {
  const classes = useStyles();

  return (
    <TableBody>
      {rows &&
        rows.map((row, rowIndex) => {
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
                if (
                  column.id === 'count' &&
                  Array.isArray(value) &&
                  value.length > 1
                ) {
                  return (
                    <TableCell
                      key={column.id + '' + rowIndex + colIndex}
                      align={column.align}
                      className={classes.cell}
                    >
                      <ul className={classes.list}>
                        {value.map((v, i) => (
                          <li key={i}>{v}</li>
                        ))}
                      </ul>
                    </TableCell>
                  );
                }
                return (
                  <TableCell
                    key={column.id + '' + rowIndex + colIndex}
                    align={column.align}
                    className={classes.cell}
                  >
                    {column.format ? column.format(value) : value}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
    </TableBody>
  );
};

export default TableRows;
