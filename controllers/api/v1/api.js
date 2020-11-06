const path = require('path');
const response = require(path.join(__dirname, '../../../tools/response'));

exports.test = (req, res) => {
  response.success(req, res, {
    'userKey': req.userKey
  });
};
