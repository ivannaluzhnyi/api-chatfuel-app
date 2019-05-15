require('es6-promise').polyfill();
require('isomorphic-fetch');

function fetchJson(url) {
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
  return fetch(url, options);
}

module.exports = fetchJson;
