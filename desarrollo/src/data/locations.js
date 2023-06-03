module.exports = async () => {

  const gql = require('./graphql');
  const QUERY = `
  { 
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
      Image: Media_locationListViaLocation_id (
        where: { Image_type: { EQ: principal } }
      ) {
        id
        Name
      }
    }
  }`;
  const data = await gql(QUERY, 'locations');
  return data.data;
};