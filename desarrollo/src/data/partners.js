module.exports = async (config) => {

  const gql = require('./graphql');
  const QUERY = `
  query data ($id: Int) {
    data: Marketing_PartnerList (
      where: { Segment_id: { EQ: $id } } 
    ) {
      id
      Name
      Image {
        name
      }
    }
  }`;
  const data = await gql(QUERY, config, 'partners');
  return data.data;
};