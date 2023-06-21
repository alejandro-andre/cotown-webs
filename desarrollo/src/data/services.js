module.exports = async (config) => {

  const gql = require('./graphql');
  const QUERY = `
  {
    data: Building_Building_service_typeList (
      orderBy: [{ attribute: Name }]
      where: { 
        AND: [
          { Published: { EQ: true } }
          { Segment_id: { EQ: $id } } 
        ]
      }
    ) { 
      id 
      Name
      Name_en
      Description
      Description_en
      Icon {
        name
      }
    }
  }`;
  const data = await gql(QUERY, config, 'services');
  return data.data;
};