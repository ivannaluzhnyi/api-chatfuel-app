const pad = s => {
  return s < 10 ? `0${s}` : s;
};

const getFormattedDate = date => {
  const d = new Date(date);
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
};

const getIdOfArtist = responseAlbum => {
  return responseAlbum.data[0].id;
}

module.exports = {
  getFormattedDate,
  getIdOfArtist,
};
