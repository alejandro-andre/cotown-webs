module.exports = async (config) => {
  const sql = require('./sql');
  const data = await sql('/prices/' + config.year, 'prices');
  return data;
};