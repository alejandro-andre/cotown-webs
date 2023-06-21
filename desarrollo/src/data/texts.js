module.exports = async (config) => {

  const gql = require('./graphql');
  const QUERY = `query data ($id: Int) { 
    data: Marketing_TextList ( 
      where: { Segment_id: { EQ: $id } } 
    ) {
      Segment_id
      Code
      Value
      Value_en
    }
  }`;
  const data = await gql(QUERY, config, 'texts');
  const json = {};
  data.data.forEach(o => { json[o.Code] = { en: o.Value_en, es: o.Value } });
  return(json); 
};