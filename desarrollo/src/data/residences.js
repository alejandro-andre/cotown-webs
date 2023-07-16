module.exports = async (config) => {

  const gql = require('./graphql');
  const QUERY  = `
  query data ($id: Int) {
    data: Geo_LocationList (
      orderBy: [{ attribute: Name }]
    ) {
      Name
      Name_en
      Districts: DistrictListViaLocation_id {
        Buildings: BuildingListViaDistrict_id ( 
          joinType: INNER
          where: { 
            Building_type_id: { NE: 33 } 
            Segment_id: { EQ: $id }
          }
        ) {
          id
          Name
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
      }
    }
  }`;
  const data = await gql(QUERY, config, 'residences');
  return data.data;
};