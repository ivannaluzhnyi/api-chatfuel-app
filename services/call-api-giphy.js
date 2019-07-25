require("es6-promise").polyfill();
require("isomorphic-fetch");
const API_KEY = process.env.API_KEY_GIPHY;

function fetchJsonGiphy(query, limit) {
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
    `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=${API_KEY}&limit=${limit}`,
    options
  );
}

module.exports = fetchJsonGiphy;
