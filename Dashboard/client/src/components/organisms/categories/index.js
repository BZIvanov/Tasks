import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useStyles } from './styles';
import { SummaryTable } from '../../molecules';
import {
  CircularProgress,
  ReactFlagsSelect,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '../../atoms';
import { transformCategoriesData } from '../../../utils/transformers';
import currentDate from '../../../utils/date';
import { COUNTRIES } from '../../../constants';

const Categories = () => {
  const classes = useStyles();
  const [iso, setIso] = useState(COUNTRIES[0]);
  const [date, setDate] = useState(currentDate);
  const [startDate, setStartDate] = useState(currentDate);
  const [websites, setWebsites] = useState([]);
  const [website, setWebsite] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const dateRef = useRef(null);
  const startDateRef = useRef(null);

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
        .get(`http://localhost:3100/website-categories/${iso}`, {
          params: {
            date,
            startDate,
            website,
          },
          cancelToken: source.token,
        })
        .then((response) => {
          setCategories(transformCategoriesData(response.data.categories));
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
  }, [iso, date, startDate, website]);

  const onSelectFlag = (countryCode) => {
    if (countryCode !== iso) {
      setWebsites([]);
    }
    setWebsite('');
    setCategories([]);
    setIso(countryCode);
  };

  const onSelectDate = () => {
    if (dateRef.current.value.localeCompare(startDate) === -1) {
      setStartDate(dateRef.current.value);
    }
    setCategories([]);
    setWebsite('');
    setDate(dateRef.current.value);
  };

  const onSelectStartDate = () => {
    setCategories([]);
    setWebsite('');
    setStartDate(startDateRef.current.value);
  };

  const onSelectWebsite = ({ target: { value } }) => {
    setCategories([]);
    setWebsite(value);
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
      {categories.length > 0 && <SummaryTable rows={categories} />}
    </div>
  );
};

export default Categories;
