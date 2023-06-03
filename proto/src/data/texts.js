module.exports = async () => {

  const QUERY  = `
  { 
    data: Marketing_TextList {
      Code
      Value
      Value_en
    }
  }`;

  // Constants
  const K = require('./constants');

  // Token
  const token = require('./token');
  const auth = { authorization : await token() };

  // Query
  const fetch = require('node-fetch');
  const query_res = await fetch(K.SERVER + '/graphql', { method: 'POST', headers: K.HEADER, body: JSON.stringify({ "query": QUERY, "variables": auth }) });
  const query_data = await query_res.json();

  // Transform
  const json = {};
  query_data.data.forEach(o => { json[o.Code] = { en: o.Value_en, es: o.Value } });
  return(json); 
};