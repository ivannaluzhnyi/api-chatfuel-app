const express = require('express');
const router = express.Router();
const artistController = require('../../controllers/artistController');
// return a test
router.get('/',songController.sendSongByName );

module.exports = router;
