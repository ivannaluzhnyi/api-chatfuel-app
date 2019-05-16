const express = require('express');
const router = express.Router();
const giphyController = require('../../controllers/giphyController');
// return a test
router.get('/', giphyController.sendGifByName);

module.exports = router;
