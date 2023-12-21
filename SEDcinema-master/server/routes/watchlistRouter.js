const Router = require('express');
const router = new Router();
const watchlistController = require('../controllers/watchlistController');
const authMiddleware = require('./../middleware/authMiddleware');
const checkDeleteDeviceFromBasket = require('../middleware/checkDeleteFilmFromWatchlist');

router
    .post('/', authMiddleware, watchlistController.addFilm)
    .get('/', authMiddleware, watchlistController.getFilms)
    .delete('/:id', authMiddleware, checkDeleteDeviceFromBasket, watchlistController.deleteFilm);

module.exports = router;
