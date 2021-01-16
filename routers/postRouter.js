const { Router } = require('express');

const postControllers = require('../controllers/postControllers');
const userMiddlewares = require('../middlewares/userMiddlewares');
const postMiddlewares = require('../middlewares/postMiddlewares');

const router = Router();

router.post(
  '/',
  postMiddlewares.validateUserEntries,
  userMiddlewares.validaJWT,
  postControllers.addPost,
);

router.get(
  '/',
  userMiddlewares.validaJWT,
  postControllers.getPost,
);

module.exports = router;
