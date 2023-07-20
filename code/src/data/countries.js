module.exports = async (config) => {

  const gql = require('./graphql');
  const QUERY = `
  {
    data: Geo_CountryList (
      orderBy: [{ attribute: Name }]
    ) {
      id
      Name
      Name_en
    }
  }`;
  const data = await gql(QUERY, config, 'countries');
  return data.data;
};