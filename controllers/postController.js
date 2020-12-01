exports.get = async (req, res) => {};

exports.getById = async (req, res) => {};

exports.getByTerm = async (req, res) => {};

exports.put = async (req, res) => {};

exports.post = async (req, res) => {
  const { email } = req.user;
  const { title, content } = req.body;

  const user = await Users.findOne({ where: { email } });
  const userId = user.dataValues.id;

  await Posts.create({ title, content, userId });
  return res.status(201).json({ title, content, userId });
};

exports.delete = async (req, res) => {};
