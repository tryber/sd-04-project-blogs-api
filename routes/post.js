const { Router } = require('express');
const Controllers = require('../controllers');

const router = Router();

const { validatePost, validateJWT } = require('../Middlewares');

router.get('/', validateJWT, Controllers.PostController.getAllPosts);
router.post('/', validateJWT, validatePost, Controllers.PostController.create);
router.get('/search', validateJWT, Controllers.PostController.searchPost);
router.get('/:id', validateJWT, Controllers.PostController.getPost);
router.put('/:id', validateJWT, validatePost, Controllers.PostController.updatePost);
router.delete('/:id', validateJWT, Controllers.PostController.deletePost);

module.exports = router;
