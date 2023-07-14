module.exports = async (config) => {

  const gql = require('./graphql');
  const QUERY  = `
  query data ($id: Int) {
    data: Building_BuildingList ( 
      where: { Segment_id: { EQ: $id } } 
    ) {
      id
      Code
      Name
      Address
      Lat_lon
      Description
      Description_en
      District: DistrictViaDistrict_id {
        Name
        Location: LocationViaLocation_id {
          id
          Name
        }
      }
      Services: Building_serviceListViaBuilding_id {
        Service: Building_service_typeViaService_id {
          id
          Name
          Name_en
          Images: Media_service_typeListViaService_type_id (
            joinType: INNER
            where: { Segment_id: { EQ: $id } }
          ) {
            id
          }
        }
      }
      Photos: Media_buildingListViaBuilding_id (
        orderBy: [{ attribute: Order }]
      ) {
        id
        Order
        Name
      }
    }
  }`;
  const data = await gql(QUERY, config, 'building');
  return data.data;
};