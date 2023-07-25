module.exports = async (config) => {

  const gql = require('./graphql');
  const QUERY = `
  {
    data: Resource_Resource_flat_typeList {
      id
      Code
      Name
      Name_en
    }
  }`;
  const data = await gql(QUERY, config, 'flat_types');
  const json = {};
  data.data.forEach(o => { json[o.Code] = { 
    id: o.id, 
    Code: o.Code, 
    Name: o.Name, 
    Name_en: o.Name_en,
  } });
  return(json); 
};