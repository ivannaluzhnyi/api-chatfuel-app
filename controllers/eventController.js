const fetchJsonSongkick = require("../services/call-api-songkick");
const { getFormattedDate } = require("../utils/helper");

exports.sendEventsLocationClient = (req, res) => {
  return fetchJsonSongkick(
    `events.json?location=geo:${req.query.latitude},${
      req.query.longitude
    }&per_page=${req.query.per_page}`
  )
    .then((data) => data.json())
    .then((response) => {
      return res.json(prepareDataToSend(response, false));
    });
};

exports.sendUpcomingEventsByArtistName = (req, res) => {
  return fetchJsonSongkick(
    `events.json?artist_name=${req.query.artist_search_events}`
  )
    .then((data) => data.json())
    .then((response) => {
      return res.json(prepareDataToSend(response, true));
    });
};

const prepareDataToSend = (response, artist) => {
  let prepare = {
    messages: []
  };
  if (response.resultsPage.status === "ok") {
    if (!response.resultsPage.results.event) {
      prepare = {
        messages: [
          {
            text: "Pas d'événement ... "
          }
        ]
      };
    } else {
      let len = 0;

      for (i = 0; i < response.resultsPage.results.event.length; i++) {
        if (len === 20) {
          break;
        }

        const artists = prepareArtist(
          response.resultsPage.results.event[i].performance
        );
        prepare.messages.push({
          text: `✅ _*${response.resultsPage.results.event[i].type} - ${
            response.resultsPage.results.event[i].displayName
          }*_,\n📅 le ${getFormattedDate(
            response.resultsPage.results.event[i].start.date
          )}  \n🗺️ à ${
            response.resultsPage.results.event[i].venue.displayName
          }, ${
            response.resultsPage.results.event[i].location.city
          } \n👨‍🎤Artistes: \n${artists}      
        `
        });
        len++;
      }
    }
  } else {
    prepare = {
      messages: [
        {
          text: "Service indisponible..."
        }
      ]
    };
  }

  return prepare;
};

const prepareArtist = (arr) => {
  let artists = "";
  arr.forEach((element) => {
    artists = artists + " - " + element.displayName + "\n";
  });
  return artists;
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
