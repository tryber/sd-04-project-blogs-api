const { Router } = require('express');
const Controllers = require('../controllers');

const router = Router();

const { validateUser, validateJWT } = require('../Middlewares');

router.get('/', validateJWT, Controllers.UserController.getAll);
router.get('/:id', validateJWT, Controllers.UserController.getUser);
router.post('/', validateUser, Controllers.UserController.create);

module.exports = router;
