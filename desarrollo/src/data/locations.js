module.exports = async () => {

  const fetch = require('node-fetch');

  // Login
  const login_res = await fetch('https://experis.flows.ninja/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ "query": "mutation { login(username:\"modelsadmin\", password:\"Ciber$2022\") }" }),
  });
  const { login_data } = await login_res.json();
  const auth = { authorization : login_data.login };

  // Query
  const query_res = await fetch('https://experis.flows.ninja/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ "query": "{ locations: Geo_LocationList { id Name Province: ProvinceViaProvince_id { Name } Districts: DistrictListViaLocation_id { Name } } }", "variables": auth }),
  });
  const { query_data } = await query_res.json();
  
  return(query_data.locations); 
};