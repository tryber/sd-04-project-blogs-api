const internal = (err, _, res, _next) => {
  const o = {
    code: 'internal_error',
    message: err.message,
    error: err,
  };

  res.status(500).json(o);
};

const notFound = (req, res) => {
  const o = {
    code: 'not_found',
    message: `${req.baseUrl} not found`,
  };

  res.status(404).json(o);
};

module.exports = {
  internal,
  notFound,
};
