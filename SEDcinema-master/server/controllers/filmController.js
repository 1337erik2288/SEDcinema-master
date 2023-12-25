const { Op } = require("sequelize");
const uuid = require('uuid');
const path = require('path');
const {Film, FilmInfo, Genre, Moviemaker, WatchlistFilm} = require('../models/models');
const apiError = require('./../error/apiError');

class FilmController {
    async create(req, res, next) {
        try {
            let {name, budget, moviemakerId, genreId, info} = req.body;
            const {img} = req.files;

            //Проверка на неотрицательность бюджета
            budget = Math.max(0, budget);

            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName));
            const film = await Film.create({
                name,
                budget,
                moviemakerId,
                genreId,
                img: fileName
            });

            if(info) {
                info = JSON.parse(info);
                info.forEach(i => {
                    FilmInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: film.id
                    })
                })
            }

            return res.json(film);
        } catch (e) {
            next(apiError.badRequest(e.message));
        }

    }

    async getAll(req, res,next) {
        try {
            let {moviemakerId, genreId, limit, page} = req.query;
            page = page || 1
            limit = limit || 9
            let offset = page * limit - limit
            let films;
            if (!moviemakerId && !genreId) {
                films = await Film.findAndCountAll({
                    include: [
                        {model: Moviemaker},
                        {model: Genre},
                    ],
                    limit,
                    offset})
            }
            if (moviemakerId && !genreId) {
                films = await Film.findAndCountAll({
                    where:{moviemakerId},
                    include: [
                        {model: Moviemaker},
                        {model: Genre},
                    ],
                    limit,
                    offset
                })}
            if (!moviemakerId && genreId) {
                films = await Film.findAndCountAll({
                    where:{genreId},
                    include: [
                        {model: Moviemaker},
                        {model: Genre},
                    ],
                    limit,
                    offset
                })}
            if (moviemakerId && genreId) {
                films = await Film.findAndCountAll({
                    where:{genreId, moviemakerId},
                    include: [
                        {model: Moviemaker},
                        {model: Genre},
                    ],
                    limit,
                    offset
                })}
            return res.json(films)
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }

    async getSearchAllFilmByName(req, res, next) {
        try {
            let {limit, page, name, filter} = req.query;

            page = page || 1;
            limit = limit || 7;
            let offset = page * limit - limit
            if(filter === "All") {
                const films =  await Film.findAndCountAll({
                    attributes: ["name", "budget", "img", "id"],
                    where:
                        {
                            name: {
                                [Op.like]: `%${name}%`
                            }
                        },
                    include: [
                        {
                            attributes: ["name"],
                            model: Moviemaker
                        },
                        {
                            attributes: ["name"],
                            model: Genre
                        },
                    ],
                    limit,
                    offset,
                })

                return res.json(films);
            } else {
                const films =  await Film.findAndCountAll({
                    attributes: ["name", "budget", "img", "id", "moviemakerId", "genreId"],
                    where:
                        {
                            name: {
                                [Op.like]: `%${name}%`
                            },
                            [Op.or]: [
                                {
                                    moviemakerId: null,
                                },
                                {
                                    genreId: null,
                                },
                            ],
                        },
                    include: [
                        {
                            attributes: ["name"],
                            model: Moviemaker
                        },
                        {
                            attributes: ["name"],
                            model: Genre
                        },
                    ],
                    limit,
                    offset,
                })


                return res.json(films);
            }
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params;
            let films = await Film.findOne({
                where: {id},
                include: [
                    {model: FilmInfo, as: 'info'},
                    {model: Genre},
                    {model: Moviemaker},
                ]
            });
            return res.json(films);
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params;
            await Film.findOne({where:{id}})
                .then( async data => {
                    if(data) {
                        await Film.destroy({where:{id}}).then(() => {
                            return res.json("Фильм удален");
                        })
                    } else {
                        return res.json("Этого фильма нет в базе данных");
                    }

                    await WatchlistFilm.destroy({where:{filmId: id}})
                })
        } catch (e) {
            return res.json(e);
        }
    }

    async update(req, res) {
        try {
            const {id} = req.params;
            const {moviemakerId, genreId, name, budget, info} = req.body;

            //проверка на неотрицательность
            const updatedBudget = Math.max(0, budget);

            await Film.findOne({where:{id}})
                .then( async data => {
                    if(data) {
                        let newVal = {};
                        moviemakerId ? newVal.moviemakerId = moviemakerId : false;
                        genreId ? newVal.genreId = genreId : false;
                        name ? newVal.name = name : false;
                        newVal.budget = updatedBudget; //использована проверенная на неотрицательность переменная

                        if(req.files) {
                            const {img} = req.files;
                            const type = img.mimetype.split('/')[1];
                            let fileName = uuid.v4() + `.${type}`;
                            await img.mv(path.resolve(__dirname, '..', 'static', fileName));
                            newVal.img = fileName;
                        }

                        if(info) {
                            const parseInfo = JSON.parse(info);
                            for (const item of parseInfo) {
                                await FilmInfo.findOne({where:{id: item.id}}).then( async data => {
                                    if(data) {
                                        await FilmInfo.update({
                                            title: item.title,
                                            description: item.description
                                        }, {where:{id: item.id}})
                                    } else {
                                        await FilmInfo.create({
                                            title: item.title,
                                            description: item.description,
                                            filmId: id
                                        })
                                    }
                                })
                            }
                        }

                        await Film.update({
                            ...newVal
                        }, {where:{id}} ).then(() => {
                            return res.json("Фильм отредактирован");
                        })
                    } else {
                        return res.json("Этого фильма нет в базе данных");
                    }
                })
            } catch (e) {
            return res.json(e);
        }
    }
}

module.exports = new FilmController();
