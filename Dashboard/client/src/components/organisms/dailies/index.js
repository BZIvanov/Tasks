import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useStyles } from './styles';
import { DetailsTable } from '../../molecules';
import {
  CircularProgress,
  ReactFlagsSelect,
  TextField,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
} from '../../atoms';
import currentDate from '../../../utils/date';

const Details = () => {
  const classes = useStyles();
  const [iso, setIso] = useState('UK');
  const [robots, setRobots] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSelectFlag = (countryCode) => {
    if (countryCode.toLowerCase() !== iso.toLowerCase()) {
      console.log(countryCode.toLowerCase());
      console.log(iso.toLowerCase());
      setRobots([]);
    }
    setIso(countryCode);
  };

  console.log(iso);

  return (
    <div className={classes.root}>
      <div className={classes.searchControls}>
        <ReactFlagsSelect onSelect={onSelectFlag} disabled={loading} />
      </div>
    </div>
  );
};

export default Details;
