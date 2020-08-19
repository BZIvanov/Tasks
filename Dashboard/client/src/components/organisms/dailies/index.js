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
import patchCountryCode from '../../../utils/patch-codes';

const Details = () => {
  const classes = useStyles();

  return <div className={classes.root}>works</div>;
};

export default Details;
