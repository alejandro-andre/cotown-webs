module.exports = async (config) => {
  const sql = require('./sql');
  const data = await sql('/flats/' + config.year, 'flats');
};