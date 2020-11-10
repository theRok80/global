/**
 * 접근 유효성 판단
 *
 * @param apiVersion
 * @returns {function(*, *, *): void}
 *
 * @author theRok
 * @since 2020.11.03
 */

const logger = require('../tools/logging');
const response = require('../tools/response');

function validation(apiVersion) {
  return function validation(req, res, next) {
    req.apiVersion = apiVersion;

    // if (req.headers['x-api-key'] === 'test-api-key') {
    //   next();
    // } else {
    //   response.invalidKey(req, res);
    // }

    next();
  };
}

module.exports = validation;
