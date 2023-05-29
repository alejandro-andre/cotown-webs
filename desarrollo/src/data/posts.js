module.exports = async () => {

  const QUERY  = `
  {
    data: Marketing_PostList (
        where: { Published: {EQ: true} }
    ) {
        id
        Publish_date
        Slug
        Slug_en
        Title
        Title_en
        Content
        Content_en
        Tags: Post_tagListViaPost_id {
            Tag: TagViaTag_id {
                Name
                Name_en
            }
        }
        Image {
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