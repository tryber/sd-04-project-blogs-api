const { Router } = require('express');
const Controllers = require('../controllers');

const router = Router();

const { validatePost, validateJWT } = require('../Middlewares');

// router.get('/', validateJWT, Controllers.UserController.getAll);
// router.get('/:id', validateJWT, Controllers.UserController.getUser);
router.post('/', validateJWT, validatePost, Controllers.PostController.create);
// router.delete('/me', validateJWT, Controllers.UserController.deleteActualUser);

module.exports = router;
