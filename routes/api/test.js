// var express = require('express');
// var router = express.Router();

// // return a test
// console.log('==test===========================');
// router.get('/', (req, res, next) => {
//   console.log('==test==funct===============');

//   return res.send('this is test message');

//   // return res.json({ message: 'this is test message' });
// });

// module.exports = router;

var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
  res.send('Birds home page');
});
// define the about route
router.get('/about', function(req, res) {
  res.send('About birds');
});

module.exports = router;
