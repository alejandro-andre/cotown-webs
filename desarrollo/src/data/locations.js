module.exports = async () => {

  const QUERY  = `
  { 
    data: Geo_LocationList { 
      id 
      Name 
      Name_en
      Province: ProvinceViaProvince_id { 
        Name 
      } 
      Districts: DistrictListViaLocation_id { 
        Name 
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