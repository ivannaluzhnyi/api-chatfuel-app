const fetchJsonGiphy = require('../services/call-api-giphy');

exports.sendGifByName = (req, res) => {
  return fetchJsonGiphy(req.query.q, '5')
    .then(data => data.json())
    .then(response => {
      return res.json(prepareDataToSend(response));
      // return res.send(response);
    })
    .catch(err => {
      new Error(err);
    });
};

const prepareDataToSend = response => {
  const prepare = {
    messages: [
      {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'media',
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
      media_type: 'image',
      title: item.title,
      url: item.images.original_still
    });
  });

  return prepare;
};

// const t = {
//   "type": "gif",
//   "id": "3ohs7GA9LpwWf5TtCw",
//   "slug": "eminem-without-me-3ohs7GA9LpwWf5TtCw",
//   "url": "https://giphy.com/gifs/eminem-without-me-3ohs7GA9LpwWf5TtCw",
//   "bitly_gif_url": "https://gph.is/2BDW2US",
//   "bitly_url": "https://gph.is/2BDW2US",
//   "embed_url": "https://giphy.com/embed/3ohs7GA9LpwWf5TtCw",
//   "username": "eminem",
//   "source": "https://www.youtube.com/watch?v=YVkUvmDQ3HY",
//   "rating": "pg",
//   "content_url": "",
//   "source_tld": "www.youtube.com",
//   "source_post_url": "https://www.youtube.com/watch?v=YVkUvmDQ3HY",
//   "is_sticker": 0,
//   "import_datetime": "2017-12-06 07:06:35",
//   "trending_datetime": "0000-00-00 00:00:00",
//   "user": {
//   "avatar_url": "https://media4.giphy.com/avatars/eminem/GHWrfxoYQkWD.jpg",
//   "banner_url": "https://media4.giphy.com/headers/eminem/imAmIM0BmtDu.jpg",
//   "banner_image": "https://media4.giphy.com/headers/eminem/imAmIM0BmtDu.jpg",
//   "profile_url": "https://giphy.com/eminem/",
//   "username": "eminem",
//   "display_name": "Eminem",
//   "is_verified": true
//   },
//   "images": {
//   "fixed_height_still": {
//   "url": "https://media2.giphy.com/media/3ohs7GA9LpwWf5TtCw/200_s.gif",
//   "width": "270",
//   "height": "200",
//   "size": "21915"
//   },
//   "original_still": {
//   "url": "https://media2.giphy.com/media/3ohs7GA9LpwWf5TtCw/giphy_s.gif",
//   "width": "480",
//   "height": "356",
//   "size": "89948"
//   },
//   "fixed_width": {
//   "url": "https://media2.giphy.com/media/3ohs7GA9LpwWf5TtCw/200w.gif",
//   "width": "200",
//   "height": "148",
//   "size": "638972",
//   "mp4": "https://media2.giphy.com/media/3ohs7GA9LpwWf5TtCw/200w.mp4",
//   "mp4_size": "152658",
//   "webp": "https://media2.giphy.com/media/3ohs7GA9LpwWf5TtCw/200w.webp",
//   "webp_size": "346712"
//   },
//   "fixed_height_small_still": {
//   "url": "https://media2.giphy.com/media/3ohs7GA9LpwWf5TtCw/100_s.gif",
//   "width": "135",
//   "height": "100",
//   "size": "8618"
//   },
//   "fixed_height_downsampled": {
//   "url": "https://media2.giphy.com/media/3ohs7GA9LpwWf5TtCw/200_d.gif",
//   "width": "270",
//   "height": "200",
//   "size": "121649",
//   "webp": "https://media2.giphy.com/media/3ohs7GA9LpwWf5TtCw/200_d.webp",
//   "webp_size": "69082"
//   },
//   "preview": {
//   "width": "245",
//   "height": "182",
//   "mp4": "https://media2.giphy.com/media/3ohs7GA9LpwWf5TtCw/giphy-preview.mp4",
//   "mp4_size": "39252"
//   },
//   "fixed_height_small": {
//   "url": "https://media2.giphy.com/media/3ohs7GA9LpwWf5TtCw/100.gif",
//   "width": "135",
//   "height": "100",
//   "size": "342540",
//   "mp4": "https://media2.giphy.com/media/3ohs7GA9LpwWf5TtCw/100.mp4",
//   "mp4_size": "95353",
//   "webp": "https://media2.giphy.com/media/3ohs7GA9LpwWf5TtCw/100.webp",
//   "webp_size": "212066"
//   },
//   "downsized_still": {
//   "url": "https://media2.giphy.com/media/3ohs7GA9LpwWf5TtCw/giphy-downsized_s.gif",
//   "width": "384",
//   "height": "284",
//   "size": "36645"
//   },
//   "downsized": {
//   "url": "https://media2.giphy.com/media/3ohs7GA9LpwWf5TtCw/giphy-downsized.gif",
//   "width": "384",
//   "height": "284",
//   "size": "1685116"
//   },
//   "downsized_large": {
//   "url": "https://media2.giphy.com/media/3ohs7GA9LpwWf5TtCw/giphy.gif",
//   "width": "480",
//   "height": "356",
//   "size": "3547343"
//   },
//   "fixed_width_small_still": {
//   "url": "https://media2.giphy.com/media/3ohs7GA9LpwWf5TtCw/100w_s.gif",
//   "width": "100",
//   "height": "74",
//   "size": "5277"
//   },
//   "preview_webp": {
//   "url": "https://media2.giphy.com/media/3ohs7GA9LpwWf5TtCw/giphy-preview.webp",
//   "width": "148",
//   "height": "110",
//   "size": "49008"
//   },
//   "fixed_width_still": {
//   "url": "https://media2.giphy.com/media/3ohs7GA9LpwWf5TtCw/200w_s.gif",
//   "width": "200",
//   "height": "148",
//   "size": "14038"
//   },
//   "fixed_width_small": {
//   "url": "https://media2.giphy.com/media/3ohs7GA9LpwWf5TtCw/100w.gif",
//   "width": "100",
//   "height": "74",
//   "size": "214666",
//   "mp4": "https://media2.giphy.com/media/3ohs7GA9LpwWf5TtCw/100w.mp4",
//   "mp4_size": "47889",
//   "webp": "https://media2.giphy.com/media/3ohs7GA9LpwWf5TtCw/100w.webp",
//   "webp_size": "151040"
//   },
//   "downsized_small": {
//   "width": "237",
//   "height": "176",
//   "mp4": "https://media2.giphy.com/media/3ohs7GA9LpwWf5TtCw/giphy-downsized-small.mp4",
//   "mp4_size": "105001"
//   },
//   "fixed_width_downsampled": {
//   "url": "https://media2.giphy.com/media/3ohs7GA9LpwWf5TtCw/200w_d.gif",
//   "width": "200",
//   "height": "148",
//   "size": "73423",
//   "webp": "https://media2.giphy.com/media/3ohs7GA9LpwWf5TtCw/200w_d.webp",
//   "webp_size": "43810"
//   },
//   "downsized_medium": {
//   "url": "https://media2.giphy.com/media/3ohs7GA9LpwWf5TtCw/giphy.gif",
//   "width": "480",
//   "height": "356",
//   "size": "3547343"
//   },
//   "original": {
//   "url": "https://media2.giphy.com/media/3ohs7GA9LpwWf5TtCw/giphy.gif",
//   "width": "480",
//   "height": "356",
//   "size": "3547343",
//   "frames": "56",
//   "mp4": "https://media2.giphy.com/media/3ohs7GA9LpwWf5TtCw/giphy.mp4",
//   "mp4_size": "664172",
//   "webp": "https://media2.giphy.com/media/3ohs7GA9LpwWf5TtCw/giphy.webp",
//   "webp_size": "1078530",
//   "hash": "78c578973d9e689e338939ecd401e9b5"
//   },
//   "fixed_height": {
//   "url": "https://media2.giphy.com/media/3ohs7GA9LpwWf5TtCw/200.gif",
//   "width": "270",
//   "height": "200",
//   "size": "1028314",
//   "mp4": "https://media2.giphy.com/media/3ohs7GA9LpwWf5TtCw/200.mp4",
//   "mp4_size": "216935",
//   "webp": "https://media2.giphy.com/media/3ohs7GA9LpwWf5TtCw/200.webp",
//   "webp_size": "503574"
//   },
//   "looping": {
//   "mp4": "https://media2.giphy.com/media/3ohs7GA9LpwWf5TtCw/giphy-loop.mp4",
//   "mp4_size": "1820063"
//   },
//   "original_mp4": {
//   "width": "480",
//   "height": "356",
//   "mp4": "https://media2.giphy.com/media/3ohs7GA9LpwWf5TtCw/giphy.mp4",
//   "mp4_size": "664172"
//   },
//   "preview_gif": {
//   "url": "https://media2.giphy.com/media/3ohs7GA9LpwWf5TtCw/giphy-preview.gif",
//   "width": "116",
//   "height": "86",
//   "size": "49930"
//   },
//   "480w_still": {
//   "url": "https://media4.giphy.com/media/3ohs7GA9LpwWf5TtCw/480w_s.jpg",
//   "width": "480",
//   "height": "356"
//   }
//   },
//   "title": "without me eminem GIF",
//   "analytics": {
//   "onload": {
//   "url": "https://giphy-analytics.giphy.com/simple_analytics?response_id=5cdd6d9e734d703373e11d49&event_type=GIF_SEARCH&gif_id=3ohs7GA9LpwWf5TtCw&action_type=SEEN"
//   },
//   "onclick": {
//   "url": "https://giphy-analytics.giphy.com/simple_analytics?response_id=5cdd6d9e734d703373e11d49&event_type=GIF_SEARCH&gif_id=3ohs7GA9LpwWf5TtCw&action_type=CLICK"
//   },
//   "onsent": {
//   "url": "https://giphy-analytics.giphy.com/simple_analytics?response_id=5cdd6d9e734d703373e11d49&event_type=GIF_SEARCH&gif_id=3ohs7GA9LpwWf5TtCw&action_type=SENT"
//   }
//   }
//   },
