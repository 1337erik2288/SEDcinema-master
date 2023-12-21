const {Watchlist, WatchlistFilm, Film, FilmInfo} = require('./../models/models');
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");

class WatchlistController {
    async addFilm(req, res) {
        try {
            const {id} = req.body;
            const token = req.headers.authorization.split(' ')[1];
            const user = jwt.verify(token, process.env.SECRET_KEY);
            const watchlist = await Watchlist.findOne({where: {userId: user.id}});
            await WatchlistFilm.create({watchlistId : watchlist.id, filmId: id});
            return res.json("фильм добавлен в список просмотров");
        } catch (e) {

            console.error(e);
        }
    }

    async getFilms(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const user = jwt.verify(token, process.env.SECRET_KEY);
            const {id} = await Watchlist.findOne({where: {userId: user.id}});
            const watchlist = await WatchlistFilm.findAll({where: {watchlistId: id}});

            const watchlistArray = [];
            for(let i = 0; i < watchlist.length; i++) {
                const watchlistFilm = await Film.findOne({
                        where: {
                            id: watchlist[i].filmId,

                        },
                        include: {
                            model: FilmInfo, as: "info",
                            where: {
                                filmId: watchlist[i].filmId,
                                [Op.or]: [
                                    {
                                        filmId: {
                                            [Op.not]: null
                                        }
                                    }
                                ],
                            },
                            required: false}
                        });
                watchlistArray.push(watchlistFilm);
            }

            return res.json(watchlistArray);
        } catch (e) {
            console.error(e);
        }
    }

    async deleteFilm(req, res) {
        try {
            const {id} = req.params;
            const user = req.user;

            await Watchlist.findOne({where: {userId: user.id}}).then(async userWatchlist => {
                if(userWatchlist.userId === user.id) {
                    await WatchlistFilm.destroy({where: {watchlistId: userWatchlist.id, filmId: id}})
                }
                return res.json(`У вас нет доступа для удаления фильма (${id}) из списка, который вам не пренадлежит`);
            });
            return res.json("Фильм удален из вашего списка");
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = new WatchlistController();
