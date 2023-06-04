module.exports = async () => {

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
  const data = await gql(QUERY, 'partners');
  return data.data;
};