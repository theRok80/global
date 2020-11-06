/**
 * @author theRok
 * @since 2020.11.03
 */

const path = require('path');
const response = require(path.join(__dirname, '../../../tools/response'));

exports.main = (req, res) => {
  response.success(req, res, {
    message: 'test'
  });
};
