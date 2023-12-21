const Router = require('express');
const router = new Router();
const moviemakerController = require('../controllers/moviemakerController');
const checkRole = require('../middleware/checkRoleMiddleware');

router
    .post('/', checkRole("ADMIN"), moviemakerController.create)
    .get('/', moviemakerController.getAll)
    .delete('/:id', checkRole("ADMIN"), moviemakerController.delete);

module.exports = router;
