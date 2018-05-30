var randtoken = require('rand-token');

exports.newGuest = () => ({
  email: "",
  isGuest: true,
  token: [randtoken.generate(32)],
  facebookId: "",
});
