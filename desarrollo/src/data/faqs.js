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
  var K = require('./constants');

  // Fetch library
  const fetch = require('node-fetch');

  // Login
  const login_res = await fetch(K.SERVER, { method: 'POST', headers: K.HEADER, body: JSON.stringify({ "query": K.LOGIN }) });
  const login_data = await login_res.json();
  const auth = { authorization : login_data.data.login };

  // Query
  const query_res = await fetch(K.SERVER, { method: 'POST', headers: K.HEADER, body: JSON.stringify({ "query": QUERY, "variables": auth }) });
  const query_data = await query_res.json();
  return(query_data.data.data); 
};