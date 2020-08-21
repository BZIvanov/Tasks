import React from 'react';
import { useStyles } from './styles';
import { TableCell } from '../../atoms';

const Cell = ({ value, column, isIncorrect }) => {
  const classes = useStyles();

  let renderValue;
  if (column.id === 'count' && Array.isArray(value) && value.length > 1) {
    renderValue = (
      <ul className={classes.list}>
        {value.map((v, i) => (
          <li key={i}>{v}</li>
        ))}
      </ul>
    );
  } else if (
    column.id === 'GalleryImages' ||
    column.id === 'HeroImage' ||
    column.id === 'InpageImages' ||
    column.id === 'ImageURL'
  ) {
    const images = value ? value.split('|').filter((src) => !!src) : [];
    renderValue = (
      <ul className={`${classes.list} ${classes.images}`}>
        {images.map((v, i) => (
          <li key={i}>
            <img src={v} alt="gallery item" />
          </li>
        ))}
      </ul>
    );
  } else {
    renderValue = column.format ? column.format(value) : value;
  }

  return (
    <TableCell
      align={column.align}
      className={`${classes.cell} ${isIncorrect ? classes.error : null}`}
    >
      {renderValue}
    </TableCell>
  );
};

export default Cell;
