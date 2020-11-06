/**
 * header 의 x-api-key, user-key 유효성 확인
 *
 * @returns {function(*, *, *): void}
 *
 * @author theRok
 * @since 2020.11.02
 */

const response = require('../tools/response');
const logger = require('../tools/logging');
const User = require('../managers/user');

function keyValidation() {

  return function keyValidation(req, res, next) {
    if (req.headers['x-api-key'] === 'test-api-key') {
      req.userKey = req.headers['user-key'];

      // console.log(User.get(req));

      next();
    } else {
      response.failToKeyValidation(req, res);
    }
  };
}

module.exports = keyValidation;
