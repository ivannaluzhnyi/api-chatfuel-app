require('es6-promise').polyfill();
require('isomorphic-fetch');
const API_KEY = '86357f87f91ef28ce2dccc12b2178535';

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

  return fetch(
    `http://api.musixmatch.com/ws/1.1/${url_q}&apikey=${API_KEY}`,
    options
  );
}

module.exports = fetchJsonSongkick;
