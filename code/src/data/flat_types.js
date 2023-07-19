module.exports = async (config) => {

  const gql = require('./graphql');
  const QUERY = `
  query data ($id: Int) {
    data: Resource_Resource_flat_typeList {
      id
      Code
      Name
      Name_en
      Texts: Resource_flat_textListViaFlat_type_id ( 
        where: { Segment_id: { EQ: $id } }
      ) {
        Description
        Description_en
      }
    }
  }`;
  const data = await gql(QUERY, config, 'flat_types');
  const json = {};
  data.data.forEach(o => { json[o.Code] = { 
    id: o.id, 
    Code: o.Code, 
    Name: o.Name, 
    Name_en: o.Name_en,
    Texts: o.Texts
  } });
  return(json); 
};