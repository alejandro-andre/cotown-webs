module.exports = async (config) => {

  const gql = require('./graphql');
  const QUERY = `
  {
    data: Booking_Customer_reasonList {
      id
      Name
      Name_en
    }
  }`;
  const data = await gql(QUERY, config, 'reasons');
  return data.data;
};