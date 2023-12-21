const Router = require('express');
const router = new Router();
const filmController = require('../controllers/filmController');
const checkRole = require('../middleware/checkRoleMiddleware');

router
    .post('/', filmController.create)
    .get('/', filmController.getAll)
    .get('/search', filmController.getSearchAllFilmByName)
    .get('/:id', filmController.getOne)
    .delete('/:id', checkRole("ADMIN"), filmController.delete)
    .put('/:id', checkRole("ADMIN"), filmController.update)

module.exports = router;
