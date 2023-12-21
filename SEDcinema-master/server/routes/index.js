const Router = require('express');
const router = new Router();
const filmRouter = require('./filmRouter');
const moviemakerRouter = require('./moviemakerRouter');
const genreRouter = require('./genreRouter');
const userRouter = require('./userRouter');
const watchlistRouter = require('./watchlistRouter');
router.use('/user', userRouter)
router.use('/genre', genreRouter)
router.use('/moviemaker', moviemakerRouter)
router.use('/film', filmRouter)
router.use('/watchlist', watchlistRouter)


module.exports = router;
