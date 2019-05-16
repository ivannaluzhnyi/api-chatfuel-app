const express = require('express');
const router = express.Router();
const playlistController = require('../../controllers/playlistController');
// return a test
router.get('/', playlistController.sendPlaylistByName);

module.exports = router;
