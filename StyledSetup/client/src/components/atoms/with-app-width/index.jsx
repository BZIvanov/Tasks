import React from 'react';
import styled from 'styled-components';

const CoverCss = styled.section`
  background-color: ${(props) =>
    props.backColor || props.theme.palette.offWhite};
`;

const AppWidthCss = styled.div`
  max-width: ${(props) => props.theme.breakpoints.lg}px;
  margin: 0 auto;
`;

const withAppWidth = (WrappedComponent) => {
  return (props) => (
    <CoverCss>
      <AppWidthCss>
        <WrappedComponent {...props} />
      </AppWidthCss>
    </CoverCss>
  );
};

export default withAppWidth;
