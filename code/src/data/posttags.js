module.exports = async (config) => {

  const gql = require('./graphql');
  const QUERY = `
  query data {
    data: Marketing_TagList (
      orderBy: [{ attribute: Name }]
    ) {
      id
      Name
      Name_en
    }
  }`;
  const data = await gql(QUERY, config, 'posttags');
  return data.data;
};