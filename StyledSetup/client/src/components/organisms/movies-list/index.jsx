import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { MovieCard } from '../../molecules';
import { withAppWidth } from '../../atoms';
import { GET_ALL_MOVIES } from './gql';

const MoviesList = () => {
  const { loading, error, data } = useQuery(GET_ALL_MOVIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const renderData = data.movies.map((movie) => (
    <MovieCard key={movie.id} movie={movie} />
  ));

  return renderData;
};

export default withAppWidth(MoviesList);
