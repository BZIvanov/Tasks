import React, { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import schema from './schema';
import formBuilder from './formBuilder';
import { CommonForm } from '../../molecules';
import { withFormStyles, Heading } from '../../atoms';
import { SIGNIN } from './gql';
import { UserContext } from '../../../context/user-context';

const SigninForm = ({ history }) => {
  const [signinUser] = useMutation(SIGNIN);
  const { dispatch } = useContext(UserContext);

  const handleFormSubmit = (data) => {
    const { email, password } = data;
    signinUser({ variables: { email, password } }).then((data) => {
      localStorage.setItem('token', data.data.signin.token);
      dispatch({ type: 'SIGNIN' });
      history.push('/');
    });
  };

  return (
    <>
      <Heading variant="h2">Signin here</Heading>
      <CommonForm
        title="Signin form"
        buttonText="Signin"
        formBuilder={formBuilder}
        schema={schema}
        onFormSubmit={handleFormSubmit}
      />
    </>
  );
};

export default withRouter(withFormStyles(SigninForm));
