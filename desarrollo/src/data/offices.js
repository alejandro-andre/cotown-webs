module.exports = async (config) => {

  const gql = require('./graphql');
  const QUERY = `
  query data {
    data: Geo_OfficeList (
      orderBy: [{ attribute: id }]
    ) { 
      id
      Address
      Location
      Email
      Phone
      Lat_lon
    }
  }`;
  const data = await gql(QUERY, config, 'offices');
  return data.data;
};