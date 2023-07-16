module.exports = async (config) => {

  const gql = require('./graphql');
  const QUERY  = `
  query data ($id: Int) {
    Geo_LocationList {
        Name
        Name_en
        Districts: DistrictListViaLocation_id {
            Buildings: BuildingListViaDistrict_id ( 
                joinType: INNER
                where: { 
                    Building_type_id: { EQ: 3 } 
                    Segment_id: { EQ: $id }
                }
            ) {
                Name
            }
        }
    }
}`;
  const data = await gql(QUERY, config, 'residences');
  return data.data;
};