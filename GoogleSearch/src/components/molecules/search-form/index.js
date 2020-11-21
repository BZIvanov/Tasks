import { useState } from 'react';
import { Paper, InputBase, IconButton, SearchIcon } from '../../atoms';
import { useStyles } from './styles';

const SearchForm = ({ onSearch }) => {
  const classes = useStyles();
  const [inputText, setInputText] = useState('');

  const handleChange = ({ target: { value } }) => {
    setInputText(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(inputText);
    setInputText('');
  };

  return (
    <Paper component='form' onSubmit={handleSubmit} className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder='Search'
        onChange={handleChange}
        value={inputText}
      />
      <IconButton type='submit' color='primary' className={classes.iconButton}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchForm;
