const { Op } = require('sequelize');
const { Posts, Users } = require('../models');

const create = async (title, content, userId) => {
  const post = await Posts.create({
    title,
    content,
    userId,
    published: new Date('2011-08-01T19:58:00.000Z'),
    updated: new Date('2011-08-01T19:58:51.000Z'),
  });

  const { id, published, updated, updatedAt, ...userData } = post.dataValues;

  return userData;
};

const edit = async (title, content, id, userId) => {
  const post = await Posts.findOne({ where: { id }, include: 'user' });

  if (!post) {
    throw { message: 'Post não encontrado', status: 404 };
  }

  if (!userId || userId !== post.user.id) {
    throw { message: 'Usuário não autorizado', status: 401 };
  }

  try {
    await Posts.update({ title, content }, { where: { id } });

    return { title, content, userId };
  } catch (error) {
    throw { message: 'Erro ao atualizar', status: 404 };
  }
};

const all = async () => {
  const posts = await Posts.findAll({
    attributes: { exclude: ['userId'] },
    include: { model: Users, as: 'user' },
  });

  return posts;
};

const viewOne = async (id) => {
  const post = await Posts.findByPk(id, {
    attributes: { exclude: ['userId'] },
    include: { model: Users, as: 'user' },
  });

  if (!post) throw { message: 'Post não existe', status: 404 };

  return post;
};

const search = async (query) => {
  const post = await Posts.findAll({
    where: { [Op.or]: [{ title: query }, { content: query }] },
    include: 'user',
  });

  if (!post) throw { message: 'Post não existe', status: 404 };

  return post;
};

/*
const delUser = async (id) => {
  const result = await Users.destroy({ where: { id } });

  if (!result) throw { message: 'Usuário não existe', status: 404 };

  return true;
}; */

module.exports = { create, all, viewOne, edit, search };
