const fetchJson = require('../services/call-api');

exports.sendPlaylistByName = (req, res) => {
  return fetchJson('https://api.deezer.com/search/playlist?q=' + req.query.q)
    .then(data => data.json())
    .then(response => {
      return res.send(prepareDataToSend(response));
    });
};

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

  response.data.forEach(item => {
    prepare.messages[0].attachment.payload.elements.push({
      title: item.name,
      image_url: item.picture_xl,
      subtitle: 'Size: M',
      buttons: [
        {
          type: 'web_url',
          url: item.link,
          title: 'Voir le playlist sur deezer'
        }
      ]
    });
  });

  return prepare;
};

// const t =  {
//   "id": 3645740262,
//   "title": "100% Eminem",
//   "public": true,
//   "nb_tracks": 40,
//   "link": "https://www.deezer.com/playlist/3645740262",
//   "picture": "https://api.deezer.com/playlist/3645740262/image",
//   "picture_small": "https://e-cdns-images.dzcdn.net/images/playlist/8e917792796412110f79996f4ae53b09/56x56-000000-80-0-0.jpg",
//   "picture_medium": "https://e-cdns-images.dzcdn.net/images/playlist/8e917792796412110f79996f4ae53b09/250x250-000000-80-0-0.jpg",
//   "picture_big": "https://e-cdns-images.dzcdn.net/images/playlist/8e917792796412110f79996f4ae53b09/500x500-000000-80-0-0.jpg",
//   "picture_xl": "https://e-cdns-images.dzcdn.net/images/playlist/8e917792796412110f79996f4ae53b09/1000x1000-000000-80-0-0.jpg",
//   "checksum": "98d404b1caa150b0f59a22598953a5d7",
//   "tracklist": "https://api.deezer.com/playlist/3645740262/tracks",
//   "creation_date": "2017-10-02 08:07:26",
//   "user": {
//     "id": 1990304482,
//     "name": "Deezer Artist Editor",
//     "tracklist": "https://api.deezer.com/user/1990304482/flow",
//     "type": "user"
//   },
//   "type": "playlist"
// },
