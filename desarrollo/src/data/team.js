module.exports = async () => {

  const QUERY  = `
  {
    data: Marketing_TeamList (
      orderBy: [{ attribute: Order }]
    ) {
      id
      Name
      Position
      Position_en
      Image {
          name
      }
      Second_image {
          name
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