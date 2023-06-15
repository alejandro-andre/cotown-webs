module.exports = async (config) => {

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
  const data = await gql(QUERY, config, 'testimonials');
  return data.data;
};