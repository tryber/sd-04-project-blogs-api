const bcryptjs = require('bcryptjs');
const { Users } = require('../models');
const { GenerateToken } = require('../utils/GenerateToken');

const create = async (displayName, email, pass, image) => {
  const userEmail = await Users.findOne({ where: { email } });

  if (userEmail) {
    throw { message: 'Usuário já existe', status: 409 };
  }

  const user = await Users.create({
    displayName,
    email,
    password: await bcryptjs.hash(pass, 10),
    image,
  });

  const { password, ...userData } = user.dataValues;

  return { userData, token: GenerateToken(userData) };
};

const edit = async (name, email) => {
  const { id } = await Users.findOne({ where: { email } });

  try {
    await Users.update({ name }, { where: { id } });
    return { message: 'Atualização concluída com sucesso' };
  } catch (err) {
    throw new Error(err);
  }
};

const all = async () => {
  const users = await Users.findAll({ attributes: { exclude: ['password'] } });

  return users;
};

const viewOne = async (id) => {
  const user = await Users.findByPk(id, { attributes: { exclude: ['password'] } });

  if (!user) throw { message: 'Usuário não existe', status: 404 };

  return user;
};

const destroy = async (id) => {
  const result = await Users.destroy({ where: { id } });

  if (!result) throw { message: 'Usuário não existe', status: 404 };

  return true;
};

module.exports = { create, edit, all, viewOne, destroy };
