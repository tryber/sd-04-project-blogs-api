const express = require('express');
const postController = require('../controllers/postController');
const { validateToken } = require('../services/auth');
const { checkTitle, checkContent } = require('../middlewares/postsValidations');

const router = express.Router();

router.get('/', validateToken, postController.get);

// router.get('/:id', postController.getById);

// router.get('/search?q=:searchTerm', postController.getByTerm);

// router.put('/:id', postController.put);

router.post('/', validateToken, checkTitle, checkContent, postController.post);

// router.delete('/:id', postController.delete);

module.exports = router;
