const express = require('express');
const router = express.Router();
const albumControler = require('../../controllers/albumControler');

router.get('/artist', albumControler.sendAlbumsByArtist);
// router.get('/', albumControler.sendAlbumByName);  TO DO

module.exports = router;
