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
import { ROBOT_TYPES, COUNTRIES, TABLE_PAGINATION } from '../../../constants';

const Details = () => {
  const classes = useStyles();
  const [iso, setIso] = useState(COUNTRIES[0]);
  const [date, setDate] = useState(currentDate);
  const [robotType, setRobotType] = useState(ROBOT_TYPES[0]);
  const [website, setWebsite] = useState('');
  const [websites, setWebsites] = useState([]);
  const [robot, setRobot] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(TABLE_PAGINATION[0]);
  const [totalResults, setTotalResults] = useState(0);
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
    if (website) {
      const source = axios.CancelToken.source();
      setLoading(true);
      axios
        .get(`http://localhost:3100/website-daily/${iso}`, {
          params: {
            date,
            website,
            robotType,
            page,
            rowsPerPage,
          },
          cancelToken: source.token,
        })
        .then((response) => {
          setRobot(response.data.robot);
          setTotalResults(response.data.resultsCount);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });

      return () => {
        source.cancel();
      };
    }
  }, [iso, date, website, robotType, page, rowsPerPage]);

  const onSelectFlag = (countryCode) => {
    if (countryCode !== iso) {
      setRobot([]);
    }
    setWebsite('');
    setIso(countryCode);
  };

  const onSelectDate = () => {
    setWebsite('');
    setRobot([]);
    setDate(dateRef.current.value);
  };

  const onSelectRobotType = ({ target: { value } }) => {
    setRobot([]);
    setRobotType(value);
  };

  const onSelectWebsite = ({ target: { value } }) => {
    setRobot([]);
    setWebsite(value);
  };

  return (
    <div className={classes.root}>
      <div className={classes.searchControls}>
        <ReactFlagsSelect onSelect={onSelectFlag} disabled={loading} />
        <TextField
          id="date"
          type="date"
          label="Extraction date"
          defaultValue={date}
          onChange={onSelectDate}
          InputLabelProps={{
            shrink: true,
          }}
          inputRef={dateRef}
          disabled={loading}
        />
        <FormControl className={classes.formControl}>
          <InputLabel id="robot-label">Robot</InputLabel>
          <Select
            labelId="robot-label"
            id="robot-label"
            value={robotType}
            onChange={onSelectRobotType}
            disabled={loading}
          >
            {ROBOT_TYPES.map((robot) => (
              <MenuItem key={robot} value={robot}>
                {robot}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          className={`${classes.formControl} ${
            website.length > 0 ? '' : classes.empty
          }`}
        >
          <InputLabel id="website-label">Source</InputLabel>
          <Select
            labelId="website-label"
            id="website-label"
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
      {robot.length > 0 ? (
        <DetailsTable
          type={robotType}
          rows={robot}
          page={page}
          onSetPage={setPage}
          rowsPerPage={rowsPerPage}
          onSetRowsPerPage={setRowsPerPage}
          totalResults={totalResults}
        />
      ) : null}
    </div>
  );
};

export default Details;
