module.exports = async () => {

  const QUERY  = `
  {
    data: Marketing_BannerList (
        orderBy: [{ attribute: id }]
        where: {
            AND: [
                { Published: { EQ: true }},
                { Page: { EQ: home }}
            ]
        }
    ) {
        id
        Link
        Page
        Published
        Text
        Text_en
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