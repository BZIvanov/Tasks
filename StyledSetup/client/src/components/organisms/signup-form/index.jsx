import React, { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import schema from './schema';
import formBuilder from './formBuilder';
import { CommonForm } from '../../molecules';
import { withFormStyles, Heading } from '../../atoms';
import { SIGNUP } from './gql';
import { UserContext } from '../../../context/user-context';

const SignupForm = ({ history }) => {
  const [signupUser] = useMutation(SIGNUP);
  const { dispatch } = useContext(UserContext);

  const handleFormSubmit = (data) => {
    const { username, email, password } = data;
    signupUser({ variables: { username, email, password } })
      .then((data) => {
        localStorage.setItem('token', data.data.signup.token);
        dispatch({ type: 'SIGNUP' });
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Heading variant="h2">Signup here</Heading>
      <CommonForm
        buttonText="Signup"
        formBuilder={formBuilder}
        schema={schema}
        onFormSubmit={handleFormSubmit}
      />
    </>
  );
};

export default withRouter(withFormStyles(SignupForm));
