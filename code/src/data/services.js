module.exports = async (config) => {

  const gql = require('./graphql');
  const QUERY = `
  query data ($id: Int!) {
    data: Building_Building_service_typeList (
      orderBy: [{ attribute: Name }]
      where: { Published: { EQ: true } }
    ) { 
      id 
      Name
      Name_en
      Description
      Description_en
      Icons: Media_service_typeListViaService_type_id (
        joinType: INNER
        where: { Segment_id: { EQ: $id } }
      ) {
        id
        Segment_id
        Icon { name }
      }
    }
  }`;
  const data = await gql(QUERY, config, 'services');
  return data.data;
};