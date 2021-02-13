import { gql } from 'apollo-boost';

export const SIGNUP = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signup(data: { username: $username, email: $email, password: $password }) {
      token
      username
      email
    }
  }
`;
