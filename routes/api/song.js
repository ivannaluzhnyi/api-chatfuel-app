const express = require('express');
const router = express.Router();
const songController = require('../../controllers/songController');
// return a test
router.get('/',songController.sendSongByName );

module.exports = router;
