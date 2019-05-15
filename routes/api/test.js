var express = require('express');
var router = express.Router();

// return a test
router.get('/', (req, res, next) => {
  return res.send('this is test message');
});

module.exports = router;
