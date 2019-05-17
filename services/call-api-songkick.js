require('es6-promise').polyfill();
require('isomorphic-fetch');
const API_KEY = 'LhH3DykKbd4YMtow';

function fetchJsonSongkick(url_q) {
  const options = {
    method: 'get'
  };
  options.headers = Object.assign(
    {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    options.headers
  );

  console.log(
    'call',
    `https://api.songkick.com/api/3.0/${url_q}&apikey=${API_KEY}`
  );

  return fetch(
    `https://api.songkick.com/api/3.0/${url_q}&apikey=${API_KEY}`,
    options
  );
}

module.exports = fetchJsonSongkick;
