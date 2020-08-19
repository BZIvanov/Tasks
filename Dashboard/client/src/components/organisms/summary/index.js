import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useStyles } from './styles';
import { SummaryTable } from '../../molecules';
import { CircularProgress, ReactFlagsSelect, TextField } from '../../atoms';
import { transformDailyData } from '../../../utils/transformers';
import currentDate from '../../../utils/date';

const Summary = () => {
  const classes = useStyles();
  const [iso, setIso] = useState('uk');
  const [date, setDate] = useState(currentDate);
  const [startDate, setStartDate] = useState(currentDate);
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(false);
  const dateRef = useRef(null);
  const startDateRef = useRef(null);

  useEffect(() => {
    const source = axios.CancelToken.source();
    setLoading(true);
    axios
      .get(`http://localhost:3100/summary/${iso}`, {
        params: {
          date,
          startDate,
        },
        cancelToken: source.token,
      })
      .then((response) => {
        const { country, robots } = response.data;
        setWebsites(transformDailyData(country, robots));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    return () => {
      source.cancel();
    };
  }, [iso, date, startDate]);

  const onSelectFlag = (countryCode) => {
    if (countryCode !== iso) {
      setWebsites([]);
    }

    setIso(countryCode);
  };

  const onSelectDate = () => {
    if (dateRef.current.value.localeCompare(startDate) === -1) {
      setStartDate(dateRef.current.value);
    }
    setWebsites([]);
    setDate(dateRef.current.value);
  };

  const onSelectStartDate = () => {
    setWebsites([]);
    setStartDate(startDateRef.current.value);
  };

  return (
    <div className={classes.root}>
      <div className={classes.searchControls}>
        <ReactFlagsSelect onSelect={onSelectFlag} disabled={loading} />
        <TextField
          id="date"
          type="date"
          label="Websites target date"
          value={date}
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
          value={startDate}
          onChange={onSelectStartDate}
          InputLabelProps={{
            shrink: true,
          }}
          inputRef={startDateRef}
          disabled={loading}
        />
      </div>

      {loading && <CircularProgress className={classes.loading} />}
      {websites.length > 0 && <SummaryTable rows={websites} />}
    </div>
  );
};

export default Summary;
