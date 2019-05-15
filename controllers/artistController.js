const fetchJson = require('../services/call-api');

exports.sendArtistsByName = (req, res) => {
  return fetchJson(
    'https://api.spotify.com/v1/search?q=' + req.query.artist + '&type=artist'
  )
    .then(data => data.json())
    .then(response => {
      return res.send(prepareDataToSend(response));
    });
};

const prepareDataToSend = data => {
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

  if (data.error) {
    return data.error;
  }
  data.artists.items.forEach(item => {
    prepare.messages[0].attachment.payload.elements.push({
      title: item.name,
      image_url: item.images[0].url,
      subtitle: 'Size: M',
      buttons: [
        {
          type: 'web_url',
          url: item.href,
          title: 'Voir sur spotify'
        }
      ]
    });
  });

  return prepare;
};
