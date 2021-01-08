const express = require('express');

const router = express.Router();

const controllers = require('../controllers');

const middleware = require('../middleware');

router.post('/', middleware.validations.registerValidation, controllers.user.create);
router.get('/', middleware.userAuth.auth, controllers.user.all);
router.get('/:id', middleware.userAuth.auth, controllers.user.viewOne);
router.delete('/me', middleware.userAuth.auth, controllers.user.destroy);

module.exports = router;
