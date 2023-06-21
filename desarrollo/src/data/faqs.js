module.exports = async (config) => {

  const gql = require('./graphql');
  const QUERY = `
  query data ($id: Int) { 
    data: Marketing_Faq_topicList (
      where: { Segment_id: { EQ: $id } }
      orderBy: [ { attribute: Order, direction:ASC, nullsGo: FIRST } ]
    ) {
      id
      Name
      Name_en
      Questions: Faq_questionListViaTopic_id (
        orderBy: [{attribute: Order, direction:ASC, nullsGo: FIRST}]
      ) {
        id
        Question
        Question_en
        Response
        Response_en
      }
    }
  }`;
  const data = await gql(QUERY, config, 'faqs');
  return data.data;
};