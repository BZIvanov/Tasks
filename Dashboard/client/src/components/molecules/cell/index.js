import React from 'react';
import { useStyles } from './styles';
import { TableCell } from '../../atoms';

const stat = (currentIndex, counts) => {
  if (currentIndex > 0) {
    const currentValue = +counts[currentIndex].count;
    const prevValue = +counts[currentIndex - 1].count;
    if (currentValue - currentValue * 0.1 > prevValue) {
      return 'green';
    } else if (currentValue + currentValue * 0.1 < prevValue) {
      return 'red';
    }
  }
  return 'none';
};

const Cell = ({ value, column, isIncorrect }) => {
  const classes = useStyles();

  let renderValue;
  if (column.id === 'count' && Array.isArray(value) && value.length > 1) {
    renderValue = (
      <ul className={`${classes.list} ${classes.timeline}`}>
        {value.map((v, i, a) => (
          <li key={i}>
            <div className={`${classes.count} ${classes[stat(i, a)]}`}>
              {v.count}
            </div>
            <div className={classes.date}>{v.extractionDate}</div>
          </li>
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
      <ul className={classes.list}>
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
