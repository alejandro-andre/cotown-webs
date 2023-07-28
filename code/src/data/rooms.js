module.exports = async (config) => {
  const sql = require('./sql');
  const data = await sql('/rooms/' + config.year, 'rooms');
  return data;
};