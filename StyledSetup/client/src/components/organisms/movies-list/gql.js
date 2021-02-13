import { gql } from 'apollo-boost';

export const GET_ALL_MOVIES = gql`
  query {
    movies {
      name
      releaseYear
      imageUrl
      description
      id
    }
  }
`;
