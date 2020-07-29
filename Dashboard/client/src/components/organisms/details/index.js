import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useStyles } from './styles';
import { SummaryTable } from '../../molecules';
import {
  CircularProgress,
  ReactFlagsSelect,
  TextField,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
} from '../../atoms';
import { transformDetailsData } from '../../../utils/transformers';
import currentDate from '../../../utils/date';
import patchCountryCode from '../../../utils/patch-codes';

const Details = () => {
  const classes = useStyles();
  const [iso, setIso] = useState('uk');
  const [date, setDate] = useState(currentDate);
  const [website, setWebsite] = useState('Very');
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(false);
  const dateRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3100/incorrect-detailed/${iso}`, {
        params: {
          date,
          website,
        },
      })
      .then((response) => {
        const { country, extractionDate, totalCount, ...rest } = response.data;
        setWebsites(transformDetailsData(country, rest));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [iso, date, website]);

  console.log(websites);

  const onSelectFlag = (countryCode) => {
    if (countryCode !== iso) {
      setWebsites([]);
    }

    setIso(patchCountryCode(countryCode));
  };

  const onSelectDate = () => {
    setWebsites([]);
    setDate(dateRef.current.value);
  };

  const onSelectWebsite = (event) => {
    setWebsites([]);
    setWebsite(event.target.value);
  };

  return (
    <div className={classes.root}>
      <div className={classes.searchControls}>
        <ReactFlagsSelect onSelect={onSelectFlag} disabled={loading} />
        <TextField
          id="date"
          type="date"
          label="Websites target date"
          defaultValue={date}
          onChange={onSelectDate}
          InputLabelProps={{
            shrink: true,
          }}
          inputRef={dateRef}
          disabled={loading}
        />
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Source</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={website}
            onChange={onSelectWebsite}
          >
            <MenuItem value={'Very'}>Very</MenuItem>
            <MenuItem value={'Argos'}>Argos</MenuItem>
            <MenuItem value={'AO'}>AO</MenuItem>
          </Select>
        </FormControl>
      </div>

      {loading && <CircularProgress className={classes.loading} />}
      {/* {websites.length > 0 && <SummaryTable rows={websites} />} */}
    </div>
  );
};

export default Details;
