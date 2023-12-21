const {Moviemaker} = require('./../models/models');

class MoviemakerController {
    async create(req, res) {
        const {name} = req.body;

        const moviemaker = await Moviemaker.create({name});
        return res.json(moviemaker);
    }

    async getAll(req, res) {
        const moviemakers = await Moviemaker.findAll();
        return res.json(moviemakers);
    }

    async delete(req, res) {
        try {
            const {id} = req.params;

            await Moviemaker.findOne({where:{id}})
                .then( async data => {
                    if(data) {
                        await Moviemaker.destroy({where:{id}}).then(() => {
                            return res.json("Производитель фильмов удален");
                        })
                    } else {
                        return res.json("Такого производителя фильмов нет в базе данных");
                    }
                })
        } catch (e) {
            return res.json(e);
        }
    }
}

module.exports = new MoviemakerController();
