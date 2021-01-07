const usersWithouPass = (users) =>
  [...users].map(({ id, displayName, email, image }) => ({ id, displayName, email, image }));

module.exports = usersWithouPass;
