module.exports = async (url, config, name) => {

  if (name == undefined)
    return undefined;

  // Requirements
  const K = require('./constants');
  const token = require('./token');
  const fetch = require('node-fetch');

  console.log('Retrieving SQL content ' + name + ' from ' + config.site);
  
  // Get token
  const auth = await token();

  // Get data
  addr = K.BACK + url + '?access_token=' + auth;
  const query_res = await fetch(K.BACK + url + '?access_token=' + auth, { method: 'GET'});
  const query_data = await query_res.json();
  return(query_data); 
};