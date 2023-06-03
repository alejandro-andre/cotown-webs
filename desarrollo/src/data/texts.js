module.exports = async () => {

  const gql = require('./graphql');
  const QUERY = `
  { 
    data: Marketing_TextList {
      Code
      Value
      Value_en
    }
  }`;
  const data = await gql(QUERY, 'texts');
  const json = {};
  data.data.forEach(o => { json[o.Code] = { en: o.Value_en, es: o.Value } });
  return(json); 
};