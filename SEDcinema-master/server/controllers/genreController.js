const {Genre} = require('./../models/models');

class GenreController {
    async create(req, res) {
        const {name} = req.body;
        const genre = await Genre.create({name})
        return res.json(genre)
    }

    async getAll(req, res) {
        const genres = await Genre.findAll()
        return res.json(genres);
    }

    async delete(req, res) {
        try {
            const {id} = req.params;
            await Genre.findOne({where:{id}})
                .then( async data => {
                    if(data) {
                        await Genre.destroy({where:{id}}).then(() => {
                            return res.json("Жанр удален");
                        })
                    } else {
                        return res.json("Этого жанра не существует в базе данных");
                    }
                })
        } catch (e) {
            return res.json(e);
        }
    }
}

module.exports = new GenreController();
