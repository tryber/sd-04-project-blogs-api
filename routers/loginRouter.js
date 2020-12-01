const { Router } = require('express');

const userMiddlewares = require('../middlewares/userMiddlewares');
const userControllers = require('../controllers/userControllers');

const router = Router();

router.post(
  '/',
  userMiddlewares.validateUserEntries,
  userMiddlewares.validateKeys,
  userMiddlewares.validaToken,
  userControllers.showToken,
);

module.exports = router;
