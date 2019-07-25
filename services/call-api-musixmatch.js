require("es6-promise").polyfill();
require("isomorphic-fetch");
const API_KEY = process.env.API_KEY_MUSIXMATCH;

function fetchJsonSongkick(url_q) {
  const options = {
    method: "get"
  };
  options.headers = Object.assign(
    {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    options.headers
  );

  return fetch(
    `http://api.musixmatch.com/ws/1.1/${url_q}&apikey=${API_KEY}`,
    options
  );
}

module.exports = fetchJsonSongkick;
