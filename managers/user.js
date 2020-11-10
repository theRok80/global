const handler = require('./handlers/userHandler');

exports.get = (req) => {
  handler.get(req);
};

exports.getByToken = (token) => {
  return new Promise((resolve, reject) => {
    let data = handler.getByToken(token);
    if (data) {
      resolve(data);
    } else {
      reject(data);
    }
  });
};
