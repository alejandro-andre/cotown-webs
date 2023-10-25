module.exports = async (config) => {
  const sql = require('./sql');
  const data = await sql('/typologies', 'typologies');
  return data;
};