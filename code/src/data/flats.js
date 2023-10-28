module.exports = async (config) => {
  const sql = require('./sql');
  const data = await sql('/flats/' + config.siteid + '/' + config.year, config, 'flats');
  return data;
};