const rescue = require('express-rescue');
const express = require('express');
const { User } = require('../models');
const router = express.Router();



router.post(
  '/',
   async (req, res) => {
    const { displayName, email, password, image } = req.body;


    await Users.create({ displayName, email, password, image });

    return res.status(201).json();
  },
);




//  const createUser =  async (req, res) => {
//   const { displayName, email, password, image } = req.body;

//   User.create({ displayName, email, password, image })
//     .then((newUser) => {
//       //  password removed to avoid passing it to teh API
//       const { id, displayName, image, email, createdAt, updatedAt } = newUser;

//       res.status(200).json({ id, displayName, image, email, createdAt, updatedAt });
//     })
//     .catch((e) => {
//       console.log(e.message);
//       res.status(500).send({ message: 'Erro ao salvar o usuário no banco' });
//     });
// };

module.exports = {
  router
};

// async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const user = await userModel.registerUser(name, email, password);
//     res.status(201).json({ user });
//   } catch (_e) {
//     res.status(501).json({
//       message: 'Erro ao salvar o usuário no banco',
//       _e,
//     });
//   }
// },
