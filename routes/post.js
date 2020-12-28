const { Router } = require('express');
const Controllers = require('../controllers');

const router = Router();

const { validatePost, validateJWT } = require('../Middlewares');

router.get('/', validateJWT, Controllers.PostController.getAllPosts);
router.get('/:id', validateJWT, Controllers.PostController.getPost);
router.post('/', validateJWT, validatePost, Controllers.PostController.create);
// router.delete('/me', validateJWT, Controllers.UserController.deleteActualUser);

module.exports = router;
