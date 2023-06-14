module.exports = async (config) => {

  const gql = require('./graphql');
  const QUERY  = `
  {
    data: Geo_LocationList {
        Name
        districts: DistrictListViaLocation_id {
            Name
            buildings: BuildingListViaDistrict_id {
                Code
                Name
                Address
                Lat_lon
            }
        }
    }
  }`;
  const data = await gql(QUERY, config, 'building');
  return data.data;
};