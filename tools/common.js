const path = require('path');
const fs = require('fs');
const _ = require('lodash');

exports.setUserLogPath = (req) => {
  let dirPath;
  if (typeof req.user != 'undefined' && _.isNumber(req.user.idx) && req.user.idx > 0) {
    dirPath = [req.apiVersion, req.user.idx % 100, req.user.idx];
  } else {
    if (typeof req.apiVersion != 'undefined') {
      dirPath = [req.apiVersion, 'unLogged'];
    } else {
      dirPath = ['default'];
    }
  }
  let logPath = path.join(__dirname, '../logs/');

  _.each(dirPath, (o) => {
    logPath += `${o}/`;
    !fs.existsSync(logPath) && fs.mkdirSync(logPath);
  });
  return logPath;
};
