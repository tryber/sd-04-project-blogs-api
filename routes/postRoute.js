const express = require('express');
const postController = require('../controllers/postController');
const { validateToken } = require('../services/auth');
const { checkTitle, checkContent, checkPostAuthor } = require('../middlewares/postsValidations');

const router = express.Router();

router.get('/', validateToken, postController.get);

router.get('/:id', validateToken, postController.getById);

router.get('/search', postController.searchGet);

router.put('/:id', validateToken, checkTitle, checkContent, checkPostAuthor, postController.put);

router.post('/', validateToken, checkTitle, checkContent, postController.post);

// router.delete('/:id', postController.delete);

module.exports = router;
