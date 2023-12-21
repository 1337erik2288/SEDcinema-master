const {Watchlist, WatchlistFilm} = require('./../models/models');
const jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {
    try {
        const {id} = req.params;
        const user = req.user;
        const userWatchlist = await Watchlist.findOne({where: {userId: user.id}});
        const filmItem = await WatchlistFilm.findOne({where: {watchlistId: userWatchlist.id, filmId: id}});

        if(filmItem) {
            return next();
        }
        return res.json("Фильм не был найден в списке");
    } catch (e) {

        res.json(e);
    }
};
