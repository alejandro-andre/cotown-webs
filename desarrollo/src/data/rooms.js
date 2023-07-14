module.exports = async (config) => {
  const sql = require('./sql');
  const data = await sql('/buildings/' + config.year, 'rooms');
  return data;
};