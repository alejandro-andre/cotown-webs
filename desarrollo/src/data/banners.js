module.exports = async (config) => {

  const gql = require('./graphql');
  const QUERY = `
  {
    data: Marketing_BannerList (
        orderBy: [{ attribute: id }]
        where: {
            AND: [
                { Published: { EQ: true }},
                { Page: { EQ: home }}
            ]
        }
    ) {
        id
        Link
        Page
        Published
        Text
        Text_en
    }
  }`;
  const data = await gql(QUERY, config, 'banners');
  return data.data;
};