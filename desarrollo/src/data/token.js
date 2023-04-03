module.exports = async () => {

  // Constants
  var K = require('./constants');

  // Fetch library
  const fetch = require('node-fetch');

  // Login
  const login_res = await fetch(K.SERVER, { method: 'POST', headers: K.HEADER, body: JSON.stringify({ "query": K.LOGIN }) });
  const login_data = await login_res.json();
  return login_data.data.login;

};