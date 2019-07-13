const pad = s => {
  return s < 10 ? `0${s}` : s;
};

const getFormattedDate = date => {
  const d = new Date(date);
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
};


module.exports = {
  getFormattedDate,
};
