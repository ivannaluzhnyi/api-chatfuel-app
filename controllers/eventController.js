const fetchJsonSongkick = require('../services/call-api-songkick');

exports.sendEventsLocationClient = (req, res) => {
  const prepareDataToSend = response => {
    const prepare = {
      messages: [
        {
          attachment: {
            type: 'template',
            payload: {
              template_type: 'generic',
              image_aspect_ratio: 'square',
              elements: []
            }
          }
        }
      ]
    };

    if (response.error) {
      return response.error;
    }

    // response.data.forEach(item => {
    //   prepare.messages[0].attachment.payload.elements.push({
    //     title: item.name,
    //     image_url: item.picture_xl,
    //     subtitle: 'Size: M',
    //     buttons: [
    //       {
    //         type: 'web_url',
    //         url: item.link,
    //         title: 'Voir le playlist sur deezer'
    //       }
    //     ]
    //   });
    // });

    return response;
  };

  return fetchJsonSongkick('events.json?location=clientip')
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
