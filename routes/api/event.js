const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const eventController = require('../../controllers/eventController');

router.get('/location/client', eventController.sendEventsLocationClient);

// router.route('/location/client').post(eventController.sendEventsLocationClient);
router.get('/artist', eventController.sendUpcomingEventsByArtistName);

module.exports = router;
