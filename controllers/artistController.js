const fetchJson = require("../services/call-api");

exports.sendArtistsByName = (req, res) => {
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

    for (i = 0; i < response.data.length ; i++) {
      if(len === 5){
        break;
      }  
      len++;
      prepare.messages[0].attachment.payload.elements.push({
        title: response.data[i].name,
        image_url: response.data[i].picture_xl,
        subtitle: "Nombre de fan : " + response.data[i].nb_fan,
        buttons: [
          {
            type: "web_url",
            url: response.data[i].link,
            title: "Visiter le site internet"
          },
          {
            type: "element_share"
          }
        ]
      });
    }

    return prepare;
  };

  return fetchJson("https://api.deezer.com/search/artist?q=" + req.query.q)
    .then((data) => data.json())
    .then((response) => {
      return res.json(prepareDataToSend(response));
    });
};
