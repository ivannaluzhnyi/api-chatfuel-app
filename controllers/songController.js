const fetchJson = require("../services/call-api-musixmatch");

exports.sendSongByName = (req, res) => {
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

    let len  = 0;

    for (i = 0; i < response.message.body.track_list.length ; i++) {
      if(len === 10){
        break;
      }  
      len++;
      prepare.messages[0].attachment.payload.elements.push({
        title: response.message.body.track_list[i].track.track_name,
        image_url:'',
        subtitle: "Album : " + response.message.body.track_list[i].track.album_name + ", Artiste : "+ response.message.body.track_list[i].track.artist_name,
        buttons: [
          {
            type: "web_url",
            url: response.message.body.track_list[i].track.track_share_url,
            title: "Voire morceau"
          },
          {
            type: "element_share"
          }
        ]
      });
    }

    return prepare;
  };

  return fetchJson("track.search?q_track=" + req.query.q)
    .then((data) => data.json())
    .then((response) => {
      return res.json(prepareDataToSend(response));
    });
};
