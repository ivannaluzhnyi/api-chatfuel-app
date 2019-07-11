const fetchJson = require("../services/call-api");

exports.sendAlbumsByArtist = (req, res) => {
  const prepareDataToSend = (response) => {
    console.log(response);
    const prepare = {
      messages: [
        {
          attachment: {
            type: "template",
            payload: {
              template_type: "generic",
              elements: []
            }
          }
        }
      ]
    };

    if (response.error) {
      return response.error;
    }

    // for (i = 0; i < 5; i++) {
    //   prepare.messages[0].attachment.payload.elements.push({
    //     title: response.data[i].title,
    //     image_url: response.data[i].cover_xl,
    //     subtitle: `Artiste:${item.artist.name} ${
    //       item.nb_tracks
    //     } morceaux, type: ${item.record_type}`,
    //     buttons: [
    //       {
    //         type: "web_url",
    //         url: response.data[i].link,
    //         title: "Visiter Website"
    //       },
    //       {
    //         type: "element_share"
    //       }
    //     ]
    //   });
    // }

    // return prepare;
    return response;
  };

  console.log('test ===> ',req.query.q);


  return fetchJson("https://api.deezer.com/search/album?q=" + req.query.q)
    .then((data) => data.json())
    .then((response) => {
      return res.json(prepareDataToSend(response));
    })
};

exports.sendAlbumByName = (req, res) => {
  const prepareDataToSend = (response) => {
    const prepare = {
      messages: [
        {
          attachment: {
            type: "template",
            payload: {
              template_type: "generic",
              elements: []
            }
          }
        }
      ]
    };

    if (response.error) {
      return response.error;
    }

    for (i = 0; i < 5; i++) {
      prepare.messages[0].attachment.payload.elements.push({
        title: response.data[i].title,
        image_url: response.data[i].cover_xl,
        subtitle: `Artiste:${item.artist.name} ${
          item.nb_tracks
        } morceaux, type: ${item.record_type}`,
        buttons: [
          {
            type: "web_url",
            url: response.data[i].link,
            title: "Visiter Website"
          },
          {
            type: "element_share"
          }
        ]
      });
    }

    return prepare;
  };


  return fetchJson("https://api.deezer.com/search/album?q=" + req.query.q)
    .then((data) => data.json())
    .then((response) => {
      return res.json(prepareDataToSend(response));
    })
    .catch((err) => new Error(err));
};

//  const t ={
//   "id": 103248,
//   "title": "The Eminem Show",
//   "link": "https://www.deezer.com/album/103248",
//   "cover": "https://api.deezer.com/album/103248/image",
//   "cover_small": "https://e-cdns-images.dzcdn.net/images/cover/ec3c8ed67427064c70f67e5815b74cef/56x56-000000-80-0-0.jpg",
//   "cover_medium": "https://e-cdns-images.dzcdn.net/images/cover/ec3c8ed67427064c70f67e5815b74cef/250x250-000000-80-0-0.jpg",
//   "cover_big": "https://e-cdns-images.dzcdn.net/images/cover/ec3c8ed67427064c70f67e5815b74cef/500x500-000000-80-0-0.jpg",
//   "cover_xl": "https://e-cdns-images.dzcdn.net/images/cover/ec3c8ed67427064c70f67e5815b74cef/1000x1000-000000-80-0-0.jpg",
//   "genre_id": 116,
//   "nb_tracks": 20,
//   "record_type": "album",
//   "tracklist": "https://api.deezer.com/album/103248/tracks",
//   "explicit_lyrics": true,
//   "artist": {
//   "id": 13,
//   "name": "Eminem",
//   "link": "https://www.deezer.com/artist/13",
//   "picture": "https://api.deezer.com/artist/13/image",
//   "picture_small": "https://e-cdns-images.dzcdn.net/images/artist/0707267475580b1b82f4da20a1b295c6/56x56-000000-80-0-0.jpg",
//   "picture_medium": "https://e-cdns-images.dzcdn.net/images/artist/0707267475580b1b82f4da20a1b295c6/250x250-000000-80-0-0.jpg",
//   "picture_big": "https://e-cdns-images.dzcdn.net/images/artist/0707267475580b1b82f4da20a1b295c6/500x500-000000-80-0-0.jpg",
//   "picture_xl": "https://e-cdns-images.dzczdn.net/images/artist/0707267475580b1b82f4da20a1b295c6/1000x1000-000000-80-0-0.jpg",
//   "tracklist": "https://api.deezer.com/artist/13/top?limit=50",
//   "type": "artist"
//   },
//   "type": "album"
//   },
