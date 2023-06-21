module.exports = async (config) => {

  const gql = require('./graphql');
  const QUERY = `
  query data ($id: Int) {
    data: Marketing_PostList (
      where: { 
        AND: [
          { Segment_id: { EQ: $id } } 
          { Published: {EQ: true } }
        ]
      }
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
  const data = await gql(QUERY, config, 'posts');
  return data.data;
};