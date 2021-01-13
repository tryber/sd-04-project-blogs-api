const { Router } = require('express');

const userControllers = require('../controllers/userControllers');
const userMiddlewares = require('../middlewares/userMiddlewares');

const router = Router();

router.post(
  '/',
  userMiddlewares.validateUserEntries,
  userMiddlewares.validaIfExist,
  userMiddlewares.validaToken,
  userControllers.showToken,
);

router.get(
  '/',
  userMiddlewares.validaJWT,
  userControllers.getAll
);

module.exports = router;
