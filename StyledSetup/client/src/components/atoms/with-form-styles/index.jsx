import React from 'react';
import styled from 'styled-components';

const FormCss = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
  & > form {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & > button {
      margin-top: 2rem;
    }
  }
`;

const withFormStyles = (WrappedComponent) => {
  return (props) => (
    <FormCss>
      <WrappedComponent {...props} />
    </FormCss>
  );
};

export default withFormStyles;
