module.exports = async () => {

  const QUERY  = `
  { 
    data: Geo_LocationList (
      orderBy: [{ attribute: Name }]
      where: { Published: { EQ: true } }
    ) {
      id
      Name
      Name_en
      Description
      Description_en
      Details
      Details_en
      Image: Media_locationListViaLocation_id (
        where: { Image_type: { EQ: principal } }
      ) {
        id
        Name
      }
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
  return(query_data.data.data); 
};