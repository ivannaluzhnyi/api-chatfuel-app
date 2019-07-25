require("es6-promise").polyfill();
require("isomorphic-fetch");
const API_KEY = process.env.API_KEY_SONGKICK;

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
    `https://api.songkick.com/api/3.0/${url_q}&apikey=${API_KEY}`,
    options
  );
}

module.exports = fetchJsonSongkick;
