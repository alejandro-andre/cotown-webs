module.exports = async (config) => {

  const gql = require('./graphql');
  const QUERY = `
  query data ($id: Int) {
    data: Marketing_Social_networkList (
      orderBy: [{ attribute: Order }]
      where: { Segment_id: { EQ: $id } } 
    ) {
      id
      Name
      Link
    }
  }`;
  const data = await gql(QUERY, config, 'rrss');
  return data.data;
};