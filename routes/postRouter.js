const express = require('express');

const router = express.Router();

const controllers = require('../controllers');

const middleware = require('../middleware');

router.post('/', middleware.validations.postValidation, middleware.userAuth.auth, controllers.post.create);
router.get('/', middleware.userAuth.auth, controllers.post.all);
router.get('/search', middleware.userAuth.auth, controllers.post.search);
router.get('/:id', middleware.userAuth.auth, controllers.post.viewOne);
router.put('/:id', middleware.validations.postValidation, middleware.userAuth.auth, controllers.post.edit);

module.exports = router;
