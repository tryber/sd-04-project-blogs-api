const express = require("express");
const router = express.Router();
const loginValidation = require("../middlewares/loginValidation");
const loginController = require("../controllers/loginController");

router.post(
  "/",
  loginValidation.checkEmail,
  loginValidation.checkPassword,
  loginValidation.checkUserExists,
  loginController.post
);
