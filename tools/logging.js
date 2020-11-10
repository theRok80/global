const winston = require('winston');
const moment = require('moment');
const _ = require('lodash');

require('dotenv').config();

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.json(),
    winston.format.timestamp({format: 'YYYY-M-dd HH:mm:ss'}),
    winston.format.prettyPrint()
  ),
});

let params = {};
const requestNames = ['path', 'params', 'body', 'query'];
const headerNames = ['token'];

if (process.env.ENVIRONMENT === 'development') {
  // logger.add(new winston.transports.Console());
}

/**
 * 모든 access log
 *
 * @param req
 *
 * @author theRok
 * @since 2020.11.02
 */
exports.accessLog = (req) => {
  if (typeof req.logPath != 'undefined') {
    const file = new winston.transports.File({
      filename: req.logPath + 'access_' + moment().format('YYYY_MM_DD') + '.log',
      level   : 'info'
    });

    logger.add(file);

    if (req.uuid) {
      params.uuid = req.uuid;
    }

    requestNames.forEach(name => {
      if (typeof req[name] != 'undefined' && Object.keys(req[name]).length) {
        params[name] = req[name];
      }
    });

    params.headers = {};
    headerNames.forEach(name => {
      params.headers[name] = req.headers[name];
    });
    logger.info(params);
    logger.remove(file);
  }
};

/**
 * error log
 *
 * @param req
 * @param err
 *
 * @author theRok
 * @since 2020.11.02
 */
exports.error = (req, err) => {
  if (req.logPath) {
    logger.add(new winston.transports.File({
      filename: req.logPath + 'error_' + moment().format('YYYY_MM_DD') + '.log',
      level   : 'error'
    }));

    if (req.uuid) {
      params.uuid = req.uuid;
    }

    requestNames.forEach(name => {
      if (typeof req[name] != 'undefined' && Object.keys(req[name]).length) {
        params[name] = req[name];
      }
    });

    params.headers = {};
    headerNames.forEach(name => {
      params.headers[name] = req.headers[name];
    });

    params.error = err;

    logger.error(params);
  }
};
