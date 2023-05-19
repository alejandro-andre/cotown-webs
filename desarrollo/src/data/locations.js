module.exports = async () => {

  const QUERY  = `
  { 
    data: Geo_LocationList {
      id
      Name
      Name_en
      Image: Media_locationListViaLocation_id {
        id
        Name
      }
    }
  }`;

  // Constants
  const K = require('./includes/constants');

  // Token
  const token = require('./includes/token');
  const auth = { authorization : await token() };

  // Query
  const fetch = require('node-fetch');
  const query_res = await fetch(K.SERVER + '/graphql', { method: 'POST', headers: K.HEADER, body: JSON.stringify({ "query": QUERY, "variables": auth }) });
  const query_data = await query_res.json();
  return(query_data.data.data); 
};