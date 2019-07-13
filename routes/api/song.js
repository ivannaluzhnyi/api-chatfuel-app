const express = require('express');
const router = express.Router();
const songController = require('../../controllers/songController');

router.get('/',songController.sendSongByName );

module.exports = router;
