import React from 'react';

const MovieCard = (props) => {
  const { id, name, description, imageUrl, releaseYear } = props.movie;
  return (
    <div>
      <div>{name}</div>
      <div>{id}</div>
      <div>{description}</div>
      <div>{imageUrl}</div>
      <div>{releaseYear}</div>
    </div>
  );
};

export default MovieCard;
