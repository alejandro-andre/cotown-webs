module.exports = async (config) => {

  const gql = require('./graphql');
  const QUERY = `
  query data ($id: Int) {
    data: Marketing_MediaList (
      where: { Segment_id: { EQ: $id } } 
    ) {
      id
      Code
      Image { type }
    }
  }`;
  const data = await gql(QUERY, config, 'images');
  const json = {};
  data.data.forEach(o => { json[o.Code] = { 'id':o.id, 'type':o.Image.type } });
  return(json); 
};