const winston = require('winston');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

require('dotenv').config();

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.json(),
    winston.format.timestamp({format: 'YYYY-M-dd HH:mm:ss'}),
    winston.format.prettyPrint()
  ),
});

let params = {};
let keyNames = ['path', 'params', 'body', 'query'];

if (process.env.ENVIRONMENT === 'development') {
  logger.add(new winston.transports.Console());
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
  const dir = path.join(__dirname, `../logs/${req.apiVersion}/${req.userKey}/`);
  !fs.existsSync(dir) && fs.mkdirSync(dir);

  const file = new winston.transports.File({
    filename: dir + 'access_' + moment().format('YYYY_MM_DD') + '.log',
    level   : 'info'
  });

  logger.add(file);

  if (req.uuid) {
    params.uuid = req.uuid;
  }

  keyNames.forEach(name => {
    if (typeof req[name] != 'undefined' && Object.keys(req[name]).length) {
      params[name] = req[name];
    }
  });

  params.headers = {};
  keyNames = ['x-api-key', 'user-key'];
  keyNames.forEach(name => {
    params.headers[name] = req.headers[name];
  });
  logger.info(params);
  logger.remove(file);
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
  let dir;
  if (req.apiVersion) {
    if (req.userKey) {
      dir = path.join(__dirname, `../logs/${req.apiVersion}/${req.userKey}/`);
    } else {
      dir = path.join(__dirname, `../logs/${res.version}/`);
    }
  } else {
    dir = path.join(__dirname, '../logs/');
  }
  !fs.existsSync(dir) && fs.mkdirSync(dir);

  logger.add(new winston.transports.File({
    filename: dir + 'error_' + moment().format('YYYY_MM_DD') + '.log',
    level: 'error'
  }));

  if (req.uuid) {
    params.uuid = req.uuid;
  }

  keyNames.forEach(name => {
    if (typeof req[name]  != 'undefined' && Object.keys(req[name]).length) {
      params[name] = req[name];
    }
  });

  params.headers = {};
  keyNames = ['x-api-key', 'user-key'];
  keyNames.forEach(name => {
    params.headers[name] = req.headers[name];
  });

  params.error = err;

  logger.error(params);
};
