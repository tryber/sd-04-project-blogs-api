const { Router } = require('express');
const Controllers = require('../controllers');

const router = Router();

const { validateUser } = require('../Middlewares');

router.get('/', (_req, res) => res.send('ok'));
router.post('/', validateUser, Controllers.UserController.create);

module.exports = router;
