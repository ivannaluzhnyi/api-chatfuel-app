const express = require('express');
const router = express.Router();
const songController = require('../../controllers/songController');
// return a test
router.get('/', artistController.sendArtistsByName);

module.exports = router;
