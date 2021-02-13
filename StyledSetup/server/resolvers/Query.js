module.exports = {
  movies: async (parent, args, { Movie }, info) => {
    return await Movie.find();
  },
};
