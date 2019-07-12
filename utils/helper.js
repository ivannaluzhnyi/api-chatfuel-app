const pad = s => {
  return s < 10 ? `0${s}` : s;
};

const getFormattedDate = date => {
  const d = new Date(date);
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
};

const getIdOfArtist = responseArtiste => {
  return responseArtiste.message.body.artist_list[0].artist.artist_id;
}

module.exports = {
  getFormattedDate,
  getIdOfArtist,
};
