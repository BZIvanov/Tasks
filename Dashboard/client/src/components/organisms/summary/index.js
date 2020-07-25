import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useStyles } from './styles';
import { SummaryTable } from '../../molecules';
import { CircularProgress } from '../../atoms';
import { transformDailyData } from '../../../utils/transformers';

const Summary = () => {
  const classes = useStyles();
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    axios
      .get(`http://localhost:3100/daily/uk`, {
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
  }, []);

  return (
    <div className={classes.root}>
      <h1>Works</h1>
      {loading && <CircularProgress className={classes.loading} />}
      <SummaryTable rows={websites} />
    </div>
  );
};

export default Summary;
