import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../../context/user-context';

const Signout = () => {
  const { dispatch } = useContext(UserContext);

  useEffect(() => {
    localStorage.removeItem('token');
    dispatch({ type: 'SIGNOUT' });
  }, [dispatch]);

  return <Redirect to="/" />;
};

export default Signout;
