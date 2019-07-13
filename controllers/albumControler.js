const fetchJsonMX = require("../services/call-api-musixmatch");


exports.sendAlbumsByArtist = (req, res) => {
  const prepareDataToSend = (responseAlbums) => {
    let prepare = {
      messages: []
    };

    if (responseAlbums.error) {
      return responseAlbums.error;
    }

    let len = 0;

    for (i = 0; i < responseAlbums.message.body.album_list.length; i++) {
      if (len === 10) {
        break;
      }
      len++;
      prepare.messages.push({
        text:
          "✅ _*" +
          responseAlbums.message.body.album_list[i].album.album_name +
          "*_\n " +
          "Rating : " +
          responseAlbums.message.body.album_list[i].album.album_rating +
          "\n 📅 Date de release : " +
          responseAlbums.message.body.album_list[i].album.album_release_date +
          " \n Genres : " +
          prepareGenre(
            responseAlbums.message.body.album_list[i].album.primary_genres
              .music_genre_list
          )
      });
    }

    return prepare;
  };

  return fetchJsonMX("artist.search?q_artist=" + req.query.q)
    .then((data) => data.json())
    .then((response) => {
      return fetchJsonMX(
        `artist.albums.get?artist_id=${
          response.message.body.artist_list[0].artist.artist_id
        }&s_release_date=desc`
      )
        .then((data) => data.json())
        .then((responseAlbums) => {
          return res.json(prepareDataToSend(responseAlbums));
        });
    });
};


const prepareGenre = (arr) => {
  let genres = "";
  arr.forEach((element) => {
    genres = genres + " - " + element.music_genre.music_genre_name + "\n";
  });
  return genres;
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
