const fetchJsonSongkick = require('../services/call-api-songkick');
const { getFormattedDate } = require('../utils/helper');

exports.sendEventsLocationClient = (req, res) => {
  const prepareDataToSend = response => {
    let prepare = {};

    if (response.resultsPage.status === 'ok') {
      prepare = {
        messages: []
      };

      response.resultsPage.results.event.forEach(event => {
        let artists = '';
        event.performance.forEach(element => {
          artist = artist + ' ' + element.displayName + '\n';
        });

        prepare.messages.push({
          text: `${event.type} - ${event.displayName} \n
            le ${getFormattedDate(event.start.date)}  \n
            Artistes: ${artists}      
          `
        });
      });
    } else {
      prepare = {
        messages: [
          {
            text: 'Service indisponible...'
          }
        ]
      };
    }

    return prepare;
  };

  return fetchJsonSongkick(
    `events.json?location=geo:${req.query.latitude},${
      req.query.longitude
    }&per_page=${req.query.per_page}`
  )
    .then(data => data.json())
    .then(response => {
      return res.json(prepareDataToSend(response));
    });
};

exports.sendUpcomingEventsByArtistName = (req, res) => {
  const prepareDataToSend = response => {
    return response;
  };

  return fetchJsonSongkick(`events.json?artist_name=${req.query.q}`)
    .then(data => data.json())
    .then(response => {
      return res.json(prepareDataToSend(response));
    });
};

// const t = {
//   "id": 37850864,
//   "displayName": "SWITCH 2019",
//   "type": "Festival",
//   "uri": "http://www.songkick.com/festivals/576274-switch/id/37850864-switch-2019?utm_source=57352&utm_medium=partner",
//   "status": "ok",
//   "popularity": 0.00001,
//   "start": {
//       "date": "2019-05-10",
//       "datetime": null,
//       "time": null
//   },
//   "performance": [
//         {
//         "id": 71882954,
//         "displayName": "Ambeyance",
//         "billing": "headline",
//         "billingIndex": 1,
//         "artist": {
//             "id": 9062219,
//             "displayName": "Ambeyance",
//             "uri": "http://www.songkick.com/artists/9062219-ambeyance?utm_source=57352&utm_medium=partner",
//             "identifier": []
//         }
//         }
//   ],
//   "ageRestriction": null,
//   "flaggedAsEnded": false,
//   "venue": {
//       "id": 384286,
//       "displayName": "Théâtre de Vanves",
//       "uri": "http://www.songkick.com/venues/384286-theatre-de-vanves?utm_source=57352&utm_medium=partner",
//       "metroArea": {
//           "displayName": "Paris",
//           "country": {
//             "displayName": "France"
//           },
//           "id": 28909,
//           "uri": "http://www.songkick.com/metro_areas/28909-france-paris?utm_source=57352&utm_medium=partner"
//       },
//       "lat": 48.82197,
//       "lng": 2.28618
//   },
//   "location": {
//       "city": "Vanves, France",
//       "lat": 48.82197,
//       "lng": 2.28618
//   },
//   "end": {
//       "date": "2019-05-18",
//       "time": null,
//       "datetime": null
//   },
//   "series": {
//       "displayName": "SWITCH"
//   }
//   },
