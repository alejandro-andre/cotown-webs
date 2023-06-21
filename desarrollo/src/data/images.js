module.exports = async (config) => {

  const gql = require('./graphql');
  const QUERY = `
  {
    data: Marketing_MediaList (
      where: { Segment_id: { EQ: $id } } 
    ) {
      id
      Code
    }
  }`;
  const data = await gql(QUERY, config, 'images');
  const json = {};
  data.data.forEach(o => { json[o.Code] = o.id });
  return(json); 
};