import React from 'react';
import { Links } from '../../molecules';
import { AppNav, FactoryIcon, Link, withAppWidth } from '../../atoms';

const Header = () => {
  return (
    <AppNav>
      <Link to="/">
        <FactoryIcon themeColor="c" size={36} />
      </Link>
      <Links />
    </AppNav>
  );
};

export default withAppWidth(Header);
