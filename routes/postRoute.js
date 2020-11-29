const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.get('/', postController.get);

router.get('/:id', postController.getById);

router.get('/search?q=:searchTerm', postController.getByTerm);

router.put('/:id', postController.put);

router.post('/', postController.post);

router.delete('/:id', postController.delete);

module.exports = router;
