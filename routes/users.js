const { Router } = require('express');
const {
  registerUser,
  getAllUsers,
  getUserById,
  deleteUser,
} = require('../controllers');
const middleware = require('../middlewares');
const { verifyUser } = require('../services');

const userRouter = Router();

userRouter.get('/', middleware.authJWT, getAllUsers);
userRouter.get('/:id', middleware.authJWT, getUserById);
userRouter.post('/', middleware.validateUser, verifyUser, registerUser);
userRouter.delete('/me', middleware.authJWT, deleteUser);

module.exports = userRouter;
