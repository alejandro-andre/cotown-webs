module.exports = async (config) => {

  const gql = require('./graphql');
  const QUERY = `
  {
    data: Marketing_PartnerList {
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