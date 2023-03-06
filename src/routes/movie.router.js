const { getAll, create, getOne, remove, update, setMoviesGenres, setMovieActors, setMovieDirectors } = require('../controllers/movie.controllers');
const express = require('express');

const movieRouter = express.Router();

movieRouter.route('/')
    .get(getAll)
    .post(create);

movieRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

movieRouter.route('/:id/genres')
    .post(setMoviesGenres)

module.exports = movieRouter;

movieRouter.route('/:id/actors')
    .post(setMovieActors)

movieRouter.route('/:id/directors')
    .post(setMovieDirectors)