const handler = require('./handlers/userHandler');

exports.get = (req) => {
  handler.get(req);
};
