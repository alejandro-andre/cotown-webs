module.exports = async () => {

    const gql = require('./graphql');
    const QUERY = `
  {
    data: Marketing_PostList (
        where: { Published: {EQ: true} }
    ) {
        id
        Publish_date
        Slug
        Slug_en
        Title
        Title_en
        Content
        Content_en
        Tags: Post_tagListViaPost_id {
            Tag: TagViaTag_id {
                Name
                Name_en
            }
        }
        Image {
            name
        }
    }
  }`;
  const data = await gql(QUERY, 'posts');
  return data.data;
};