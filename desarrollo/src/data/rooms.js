module.exports = async (config) => {
  const sql = require('./sql');
  const data = await sql('/buildings/2023', 'rooms');
  return data;
};