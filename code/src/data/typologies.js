module.exports = async (config) => {
  const sql = require('./sql');
  const data = await sql('/types', 'typologies');
  return data;
};