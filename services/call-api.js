require('es6-promise').polyfill();
require('isomorphic-fetch');

function fetchJson(url) {
  const options = {
    method: 'get',
    headers: {
      Authorization:
        'Bearer  BQCdxIinEC0bcNFWVugRS6wlU8mOZxWaBtCRH72DTxqJ2k1bjptVwS0m2INUNrWu6pZ7G9-IObnt8B1WRVm9QweTZHlysJ2baulQ5z2B3upKSmSev4dG3gjFdyLS4wUeVOLDlUQnfr2Hcmx0yxraOdl8XRc6Ax9BEXSn5qKrRU-MJHNwsDAx4BFeJ08q'
    }
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
