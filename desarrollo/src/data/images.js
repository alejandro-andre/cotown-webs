module.exports = async (config) => {

  const gql = require('./graphql');
  const QUERY = `
  {
    data: Marketing_MediaList {
        id
        Code
    }
  }`;
  const data = await gql(QUERY, config, 'images');
  const json = {};
  data.data.forEach(o => { json[o.Code] = o.id });
  return(json); 
};