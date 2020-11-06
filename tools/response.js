const logger = require('./logging');

exports.notFound = (req, res) => {
  res.status(404).json({
    message: 'Not Found'
  });
};

exports.error = (req, res, err) => {
  logger.error(req, err);
  res.status(500).json({
    uuid   : req.uuid,
    message: 'Error',
    error  : err
  });
};

exports.invalidKey = (req, res) => {
  logger.error(req, 'invalid key');
  res.status(401).json({
    uuid   : req.uuid,
    message: 'invalid key'
  });
};

exports.missingKeys = (req, res, err) => {
  logger.error(req, err);
  res.status(401).json({
    uuid   : req.uuid,
    message: 'key is missing'
  });
};

exports.failToKeyValidation = (req, res) => {
  logger.error(req, 'fail to key validation');
  res.status(401).json({
    uuid   : req.uuid,
    message: 'fail to validation user'
  });
};

exports.success = (req, res, data) => {
  res.status(200).json({
    uuid: req.uuid,
    data: data
  });
};

