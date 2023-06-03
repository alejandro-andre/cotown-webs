module.exports = async () => {

  const gql = require('./graphql');
  const QUERY = `
  {
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
  const data = await gql(QUERY, 'offices');
  return data.data;
};