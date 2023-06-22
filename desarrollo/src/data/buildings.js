module.exports = async (config) => {

  const gql = require('./graphql');
  const QUERY  = `
  query data ($id: Int) {
    data: Building_BuildingList ( 
      where: { Segment_id: { EQ: $id } } 
    ) {
      Code
      Name
      Address
      Lat_lon
      District: DistrictViaDistrict_id {
        Name
        Location: LocationViaLocation_id {
          Name
        }
      }
    }
  }`;
  const data = await gql(QUERY, config, 'building');
  return data.data;
};