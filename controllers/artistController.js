const fetchJson = require('../services/call-api');

exports.sendArtistsByName = (req, res) => {
  const prepareDataToSend = response => {
    const prepare = {
      set_attributes: {
        artist_search_events: req.query.q
      },
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
            title: 'Voir sur deezer'
          }
        ]
      });
    });

    return prepare;
  };
  return fetchJson('https://api.deezer.com/search/artist?q=' + req.query.q)
    .then(data => data.json())
    .then(response => {
      return res.json(prepareDataToSend(response));
    });
};
