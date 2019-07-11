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
      "messages":[
        {
          "attachment":{
            "type":"template",
            "payload":{
              "template_type":"generic",
              "elements":[
                {
                  "title":"Get in touch",
                  "image_url":"https://rockets.chatfuel.com/assets/contact.jpg",
                  "subtitle":"Feel free to hit us up!",
                  "buttons":[
                    {
                      "type":"phone_number",
                      "phone_number":"+19268881413",
                      "title":"Call"
                    },
                    {
                      "type":"element_share"
                    }
                  ]
                },
                {
                  "title":"Get in touch",
                  "image_url":"https://rockets.chatfuel.com/assets/contact.jpg",
                  "subtitle":"Feel free to hit us up!",
                  "buttons":[
                    {
                      "type":"phone_number",
                      "phone_number":"+19268881413",
                      "title":"Call"
                    },
                    {
                      "type":"element_share"
                    }
                  ]
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
