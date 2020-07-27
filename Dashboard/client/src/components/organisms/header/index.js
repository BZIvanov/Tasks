import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROOT_PATH, TOTALS_PATH } from '../../../constants';

const Header = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to={ROOT_PATH} exact>
            Summary
          </NavLink>
        </li>
        <li>
          <NavLink to={TOTALS_PATH}>Totals</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
