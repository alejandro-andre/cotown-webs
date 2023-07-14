module.exports = async (config) => {

  const gql = require('./graphql');
  const QUERY = `
  {
    data: Marketing_Media_resource_typeList (
      orderBy: [{ attribute: Order }]
    ) {
      id
      Order
      Name
      Image { name }
      Building: BuildingViaBuilding_id {
        id
        Name
      }
      Place_type: Resource_place_typeViaPlace_type_id {
        Code
      }
    }
  }`;
  const data = await gql(QUERY, config, 'banners');
  return data.data;
};