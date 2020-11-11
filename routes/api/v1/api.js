const express = require('express');
const router = express.Router();
const response = require('../../../tools/response');
const controller = {
  test: require('../../../controllers/api/v1/api'),
  page: require('../../../controllers/api/v1/page')
};


router.get('/test', controller.test.test);
router.get('/page/:name', (req, res) => {
  req.pageName = req.params.name;

  if (typeof controller.page[req.pageName] == 'undefined') {
    response.notFound(req, res);
  } else {
    controller.page[req.pageName](req, res);
  }
});

module.exports = router;
