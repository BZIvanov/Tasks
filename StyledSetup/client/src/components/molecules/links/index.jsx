import React, { useContext } from 'react';
import { UserContext } from '../../../context/user-context';
import { NavItems, NavItem, NavLink } from '../../atoms';

const Links = () => {
  const countContext = useContext(UserContext);

  return (
    <NavItems>
      {countContext.user.isLoggedIn ? (
        <>
          <NavItem>
            <NavLink to="/movie/add">Add Movie</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/signout">Signout</NavLink>
          </NavItem>
        </>
      ) : (
        <>
          <NavItem>
            <NavLink to="/signup">Signup</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/signin">Signin</NavLink>
          </NavItem>
        </>
      )}
    </NavItems>
  );
};

export default Links;
