module.exports = async (config) => {

  const gql = require('./graphql');
  const QUERY = `
  {
    data: Marketing_TeamList (
      orderBy: [{ attribute: Order }]
    ) {
      id
      Name
      Position
      Position_en
      Image {
          name
      }
      Second_image {
          name
      }
    }
  }`;
  const data = await gql(QUERY, config, 'team');
  return data.data;
};