const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'The movie must have a name'],
    minlength: [2, 'Movie name should have 2 or more characters'],
    maxlength: [50, 'Movie name should be at most 50 characters'],
  },
  releaseYear: {
    type: Number,
    trim: true,
    required: [true, 'Movie name must have a release year'],
    min: [1900, 'Release year should be 1900 or later'],
    // TODO current year should be set dynamically
    max: [2020, 'Release year should equal 2020 or before'],
  },
  imageUrl: {
    type: String,
    trim: true,
    required: [true, 'Movie must have image URL'],
    maxlength: [250, 'Image URL should be at most 250 characters long'],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [
      1000,
      'Movie description should be at most 1000 characters long',
    ],
    default: 'Probably a good to watch movie',
  },
});

module.exports = mongoose.model('Movie', movieSchema);
