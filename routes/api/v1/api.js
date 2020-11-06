const express = require('express');
const router = express.Router();
const controller = {
  test: require('../../../controllers/api/v1/api'),
  page: require('../../../controllers/api/v1/page')
};


router.get('/test', controller.test.test);
router.get('/page/:name', (req, res, next) => {
  const name = req.params.name;
  res.send(name);
});

module.exports = router;
