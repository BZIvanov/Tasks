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
  const [iso, setIso] = useState('uk');
  const [date, setDate] = useState(currentDate);
  const [website, setWebsite] = useState([]);
  const [websites, setWebsites] = useState(['']);
  const [robots, setRobots] = useState([]);
  const [loading, setLoading] = useState(false);
  const dateRef = useRef(null);

  useEffect(() => {
    const source = axios.CancelToken.source();
    setLoading(true);
    axios
      .get(`http://localhost:3100/websites-list/${iso}`, {
        params: {
          date,
        },
        cancelToken: source.token,
      })
      .then((response) => {
        setWebsites(response.data.websites);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    return () => {
      source.cancel();
    };
  }, [iso, date]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    setLoading(true);
    axios
      .get(`http://localhost:3100/incorrect-detailed/${iso}`, {
        params: {
          date,
          website,
        },
        cancelToken: source.token,
      })
      .then((response) => {
        setRobots(response.data.robots);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    return () => {
      source.cancel();
    };
  }, [iso, date, website, websites]);

  const onSelectFlag = (countryCode) => {
    if (countryCode !== iso) {
      setRobots([]);
    }

    setIso(patchCountryCode(countryCode));
  };

  const onSelectDate = () => {
    setRobots([]);
    setDate(dateRef.current.value);
  };

  const onSelectWebsite = (event) => {
    setRobots([]);
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
            disabled={loading}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {websites.map((website) => (
              <MenuItem key={website} value={website}>
                {website}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {loading && <CircularProgress className={classes.loading} />}
      {robots &&
        robots.map((robot) =>
          robot.rows.length > 0 ? (
            <DetailsTable
              key={robot.robot}
              type={robot.robot}
              rows={robot.rows}
            />
          ) : null
        )}
    </div>
  );
};

export default Details;
