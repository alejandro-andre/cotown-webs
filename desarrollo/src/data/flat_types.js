module.exports = async (config) => {

  const gql = require('./graphql');
  const QUERY = `
  {
    data: Resource_Resource_flat_typeList {
      id
      Code
      Name
      Name_en
      Description
      Description_en
    }
  }`;
  const data = await gql(QUERY, config, 'flat_types');
  const json = {};
  data.data.forEach(o => { json[o.Code] = { 
    id: o.id, 
    Code: o.Code, 
    Name: o.Name, 
    Name_en: o.Name_en, 
    Description: o.Description, 
    Description_en: o.Description_en 
  } });
  return(json); 
};