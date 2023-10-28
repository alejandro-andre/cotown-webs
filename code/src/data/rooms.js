module.exports = async (config) => {
  const sql = require('./sql');
  const data = await sql('/rooms/' + config.siteid + '/' + config.year, config, 'rooms');
  return data;
};