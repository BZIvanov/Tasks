import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useStyles } from './styles';
import { SummaryTable } from '../../molecules';
import { CircularProgress, ReactFlagsSelect } from '../../atoms';
import { transformDailyData } from '../../../utils/transformers';

const Summary = () => {
  const classes = useStyles();
  const [iso, setIso] = useState('uk');
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchData(iso);
  }, [iso]);

  const onSelectFlag = (countryCode) => {
    setWebsites([]);
    setIso(countryCode);
  };

  const fetchData = (isoCode) => {
    axios
      .get(`http://localhost:3100/daily/${isoCode}`, {
        params: {
          date: '2020-07-24',
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
  };

  return (
    <div className={classes.root}>
      <ReactFlagsSelect onSelect={onSelectFlag} />
      {loading && <CircularProgress className={classes.loading} />}
      {websites.length > 0 && <SummaryTable rows={websites} />}
    </div>
  );
};

export default Summary;
