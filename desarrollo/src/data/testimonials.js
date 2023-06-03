module.exports = async () => {

  const gql = require('./graphql');
  const QUERY = `
  {
    data: Marketing_TestimonialsList {
        id
        Name 
        Text
        Text_en
        Date
        Stars
        Image { name }
    }
  }`;
  const data = await gql(QUERY, 'testimonials');
  return data.data;
};