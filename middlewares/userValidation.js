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
const {setUserLogPath} = require('../tools/common');

function userValidation() {
  return function userValidation(req, res, next) {
    if (req.headers.token) {
      Promise.all([User.getByToken(req.headers.token)])
        .then((result) => {
          req.user = result[0];
          req.logPath = setUserLogPath(req);

          logger.accessLog(req);
        })
        .catch((err) => {
          response.error(req, res, err);
        });
    }
    next();
  };
}

module.exports = userValidation;
