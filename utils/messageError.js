const messageError = (res, status, message) => res.status(status).json({ message });

module.exports = messageError;
