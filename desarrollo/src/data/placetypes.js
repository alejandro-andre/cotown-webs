module.exports = async (config) => {

  const gql = require('./graphql');
  const QUERY = `
  {
    data: Resource_Resource_place_typeList {
      Name
      Photos: Media_resource_typeListViaPlace_type_id (
        orderBy: [{ attribute: Order }]
      ) {
        id
        Order
        Name
        Building_id
      }
    }
  }`;
  const data = await gql(QUERY, config, 'banners');
  return data.data;
};