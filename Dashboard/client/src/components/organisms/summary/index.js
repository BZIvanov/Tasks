import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useStyles } from './styles';
import { SummaryTable } from '../../molecules';
import { CircularProgress, ReactFlagsSelect, TextField } from '../../atoms';
import { transformDailyData } from '../../../utils/transformers';
import currentDate from '../../../utils/date';
import patchCountryCode from '../../../utils/patch-codes';

const Summary = () => {
  const classes = useStyles();
  const [iso, setIso] = useState('uk');
  const [date, setDate] = useState(currentDate);
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(false);
  const dateRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3100/daily/${iso}`, {
        params: {
          date,
        },
      })
      .then((response) => {
        const { country, extractionDate, ...rest } = response.data;
        setWebsites(transformDailyData(country, rest));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [iso, date]);

  const onSelectFlag = (countryCode) => {
    if (countryCode !== iso) {
      setWebsites([]);
    }

    setIso(patchCountryCode(countryCode));
  };

  const onSelectDate = () => {
    setDate(dateRef.current.value);
  };

  return (
    <div className={classes.root}>
      <div className={classes.searchControls}>
        <ReactFlagsSelect onSelect={onSelectFlag} disabled={loading} />
        <TextField
          id="date"
          type="date"
          defaultValue={date}
          onChange={onSelectDate}
          InputLabelProps={{
            shrink: true,
          }}
          inputRef={dateRef}
          disabled={loading}
        />
      </div>

      {loading && <CircularProgress className={classes.loading} />}
      {websites.length > 0 && <SummaryTable rows={websites} />}
    </div>
  );
};

export default Summary;
