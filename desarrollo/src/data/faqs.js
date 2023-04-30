module.exports = async () => {

  const QUERY  = `
  {
    data: Marketing_Faq_topicList (
      orderBy: [{attribute: Order, direction:ASC, nullsGo: FIRST}]
    ) {
      id
      Name
      Name_en
      Questions: Faq_questionListViaTopic_id (
        orderBy: [{attribute: Order, direction:ASC, nullsGo: FIRST}]
      ) {
        id
        Question
        Question_en
        Response
        Response_en
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