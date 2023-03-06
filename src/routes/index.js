const express = require('express');
const actorRouter = require('./actor.router');
const directorRouter = require('./director.router');
const genreRouter = require('./genre.router');
const movieRouter = require('./movie.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/genres', genreRouter);
router.use('/actors', actorRouter);
router.use('/movies', movieRouter);
router.use('/directors', directorRouter);


module.exports = router;