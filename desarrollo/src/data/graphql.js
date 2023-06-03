module.exports = async (query, name) => {

  if (name == undefined)
    return undefined;

  // Requirements
  const K = require('./constants');
  const token = require('./token');
  const fetch = require('node-fetch');

  console.log('INIT ' + name);
  
  // Get token
  const auth = { authorization : await token() };

  // Get data
  const query_res = await fetch(K.SERVER + '/graphql', { method: 'POST', headers: K.HEADER, body: JSON.stringify({ "query": query, "variables": auth }) });
  const query_data = await query_res.json();

  console.log('END ' + name);

  return(query_data.data); 
};