module.exports = async (config) => {

  const gql = require('./graphql');
  const QUERY = `
  {
    data: Geo_OfficeList (
      where: { Segment_id: { EQ: $id } } 
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