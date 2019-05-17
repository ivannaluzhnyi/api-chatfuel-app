const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const eventController = require('../../controllers/eventController');

router.post(
  '/location/client',
  bodyParser.json(),
  eventController.sendEventsLocationClient
);

// router.route('/location/client').post(eventController.sendEventsLocationClient);
router.get('/artist', eventController.sendUpcomingEventsByArtistName);

module.exports = router;
