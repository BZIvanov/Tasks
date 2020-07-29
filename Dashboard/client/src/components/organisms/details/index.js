import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useStyles } from './styles';
import { SummaryTable } from '../../molecules';
import { CircularProgress, ReactFlagsSelect, TextField } from '../../atoms';
import {
  transformDailyData,
  transformDetailsData,
} from '../../../utils/transformers';
import currentDate from '../../../utils/date';
import patchCountryCode from '../../../utils/patch-codes';

const Details = () => {
  const classes = useStyles();
  const [iso, setIso] = useState('uk');
  const [date, setDate] = useState('2020-07-28');
  const [website, setWebsite] = useState('Very');
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(false);
  const dateRef = useRef(null);
  const startDateRef = useRef(null);

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

  const onSelectWebsite = () => {
    setWebsites([]);
    setWebsite(startDateRef.current.value);
  };

  return (
    <div className={classes.root}>
      {/* <div className={classes.searchControls}>
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
        <TextField
          id="startDate"
          type="date"
          label="Start historical date"
          defaultValue={startDate}
          onChange={onSelectWebsite}
          InputLabelProps={{
            shrink: true,
          }}
          inputRef={startDateRef}
          disabled={loading}
        />
      </div>

      {loading && <CircularProgress className={classes.loading} />}
      {websites.length > 0 && <SummaryTable rows={websites} />} */}
    </div>
  );
};

export default Details;
