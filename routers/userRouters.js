const { Router } = require('express');

const userControllers = require('../controllers/userControllers');
const userMiddlewares = require('../middlewares/userMiddlewares');

const router = Router();

router.post('/',
  userMiddlewares.validateUser,
  userMiddlewares.validaIfExist,
  userControllers.addOne
);

module.exports = router;
