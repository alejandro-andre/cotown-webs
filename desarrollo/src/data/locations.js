module.exports = async (config) => {

  const gql = require('./graphql');
  const QUERY = `
  query data { 
    data: Geo_LocationList (
      orderBy: [{ attribute: Name }]
      where: { Published: { EQ: true } }
    ) {
      id
      Name
      Name_en
      Description
      Description_en
      Details
      Details_en
      Images: Media_locationListViaLocation_id {
        id
        Name
        Image_type
      }
    }
  }`;
  const data = await gql(QUERY, config, 'locations');
  return data.data;
};