const { gql } = require('apollo-server-express');

exports.typeDefs = gql`
  type Query {
    movies: [Movie!]!
  }

  type Mutation {
    addMovie(data: CreateMovieInput!): Movie!
    signup(data: SignupUserInput): User!
    signin(data: SigninUserInput): User!
  }

  type Movie {
    id: ID!
    name: String!
    releaseYear: Int!
    imageUrl: String!
    description: String!
  }

  type User {
    token: String!
    username: String!
    email: String!
  }

  input CreateMovieInput {
    name: String!
    releaseYear: Int!
    imageUrl: String!
    description: String
  }

  input SignupUserInput {
    username: String!
    email: String!
    password: String!
  }

  input SigninUserInput {
    email: String!
    password: String!
  }
`;
