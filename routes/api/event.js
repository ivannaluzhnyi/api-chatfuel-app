const express = require('express');
const router = express.Router();
const eventController = require('../../controllers/eventController');
// return a test
router.post('/location/client', eventController.sendEventsLocationClient);
router.get('/artist', eventController.sendUpcomingEventsByArtistName);

module.exports = router;