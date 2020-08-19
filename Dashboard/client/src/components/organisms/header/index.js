import React, { useState } from 'react';
import { useStyles } from './styles';
import { NavLink } from 'react-router-dom';
import { Menu, MenuItem, Button } from '../../atoms';
import {
  ROOT_PATH,
  WEBSITE_DAILY_PATH,
  INVALID_ENTITIES_PATH,
} from '../../../constants';

const Header = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Open Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <NavLink to={ROOT_PATH} exact>
            Summary
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink to={WEBSITE_DAILY_PATH}>Dailies</NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink to={INVALID_ENTITIES_PATH}>Invalid entities</NavLink>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Header;
