module.exports = async (config) => {
  const sql = require('./sql');
  const data = await sql('/amenities', 'amenities');
  return data;
};