var router = require('express').Router();

router.use('/', require('./test'));
router.use('/artist', require('./artist'));
router.use('/album', require('./album'));
router.use('/playlist', require('./playlist'));

router.use('/events', require('./event'));

router.use('/gif', require('./giphy'));
router.use('/song', require('./song'));

router.use(function(err, req, res, next) {
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function(errors, key) {
        errors[key] = err.errors[key].message;

        return errors;
      }, {})
    });
  }

  return next(err);
});

module.exports = router;
