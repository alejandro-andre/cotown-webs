module.exports = async (config) => {
  const sql = require('./sql');
  const data = await sql('/typologies/' + config.siteid, config, 'typologies');
  return data;
};