import { gql } from 'apollo-boost';

export const SIGNIN = gql`
  mutation($email: String!, $password: String!) {
    signin(data: { email: $email, password: $password }) {
      token
      username
      email
    }
  }
`;
