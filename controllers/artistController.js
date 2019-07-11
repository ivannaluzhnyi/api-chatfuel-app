const fetchJson = require("../services/call-api");

exports.sendArtistsByName = (req, res) => {
  const prepareDataToSend = (response) => {
    // const prepare = {
    //   set_attributes: {
    //     artist_search_events: req.query.q
    //   },
    //   messages: [
    //     {
    //       attachment: {
    //         type: 'template',
    //         payload: {
    //           template_type: 'generic',
    //           image_aspect_ratio: 'square',
    //           elements: []
    //         }
    //       }
    //     }
    //   ]
    // };

    // if (response.error) {
    //   return response.error;
    // }

    // response.data.forEach(item => {
    //   prepare.messages[0].attachment.payload.elements.push({
    //     title: item.name,
    //     image_url: item.picture_xl,
    //     subtitle: 'Size: M',
    //     buttons: [
    //       {
    //         type: 'web_url',
    //         url: item.link,
    //         title: 'Voir sur deezer'
    //       }
    //     ]
    //   });
    // });

    const prepare = {
      messages: [
        {
          attachment: {
            type: "image",
            payload: {
              url: "https://rockets.chatfuel.com/assets/welcome.png"
            }
          }
        }
      ]
    };

    // return prepare;
    return {
      "messages": [
        {
          "attachment": {
            "type": "template",
            "payload": {
              "template_type": "button",
              "text": "Hello!",
              "buttons": [
                {
                  "type": "show_block",
                  "block_names": ["name of block"],
                  "title": "Show Block"
                },
                {
                  "type": "web_url",
                  "url": "https://rockets.chatfuel.com",
                  "title": "Visit Website"
                },
                {
                  "url": "https://rockets.chatfuel.com/api/welcome",
                  "type":"json_plugin_url",
                  "title":"Postback"
                }
              ]
            }
          }
        }
      ]
    }
  };

  return fetchJson("https://api.deezer.com/search/artist?q=" + req.query.q)
    .then((data) => data.json())
    .then((response) => {
      return res.json(prepareDataToSend(response));
    });
};
