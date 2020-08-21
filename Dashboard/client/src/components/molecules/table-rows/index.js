import React from 'react';
import { useStyles } from './styles';
import { Cell } from '../';
import { TableBody, TableRow } from '../../atoms';
import validator from '../../../utils/validators';

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
                const isIncorrect = validator[column.id]
                  ? validator[column.id](value)
                  : false;
                return (
                  <Cell
                    key={column.id + '' + rowIndex + colIndex}
                    column={column}
                    value={value}
                    isIncorrect={isIncorrect}
                  />
                );
              })}
            </TableRow>
          );
        })}
    </TableBody>
  );
};

export default TableRows;
