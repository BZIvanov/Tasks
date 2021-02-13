import React from 'react';
import styled from 'styled-components';

const NavCss = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
`;

const AppNav = ({ children }) => {
  return <NavCss>{children}</NavCss>;
};

export default AppNav;
