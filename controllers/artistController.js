const fetchJson = require("../services/call-api");

exports.sendArtistsByName = (req, res) => {
  const prepareDataToSend = (response) => {
    console.log("response", response);
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

    response.data.forEach((item) => {
      prepare.messages[0].attachment.payload.elements.push({
        title: item.name,
        image_url: item.picture_xl,
        subtitle: "Feel free to hit us up!",
        buttons: [
          {
            type: "web_url",
            url: "item.link",
            title: "Visit Website"
          },
          {
            type: "element_share"
          }
        ]
      });
    });

    return prepare;

    return {
      messages: [
        {
          attachment: {
            type: "template",
            payload: {
              template_type: "generic",
              elements: [
                {
                  title: "Eminem",
                  image_url:
                    "https://cdns-images.dzcdn.net/images/artist/0707267475580b1b82f4da20a1b295c6/1000x1000-000000-80-0-0.jpg",
                  subtitle: "Feel free to hit us up!",
                  buttons: [
                    {
                      type: "web_url",
                      url: "item.link",
                      title: "Visit Website"
                    },
                    {
                      type: "element_share"
                    }
                  ]
                }
              ]
            }
          }
        }
      ]
    };
  };

  return fetchJson("https://api.deezer.com/search/artist?q=" + req.query.q)
    .then((data) => data.json())
    .then((response) => {
      return res.json(prepareDataToSend(response));
    });
};
