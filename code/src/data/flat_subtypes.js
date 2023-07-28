module.exports = async (config) => {

  const gql = require('./graphql');
  const QUERY = `
  query data ($id: Int) {
    data: Resource_Resource_flat_subtypeList {
      id
      Code
      Name
      Name_en
      Description
      Description_en
      Amenities: Resource_flat_amenityListViaFlat_subtype_id {
        Amenity: Resource_amenity_typeViaAmenity_type_id {
          id
          Name
          Name_en
          Icons: Media_amenityListViaAmenity_type_id (
            where: { Segment_id: { EQ: $id } }
          ) {
            id
          }
        }
      }
    }
  }`;
  const data = await gql(QUERY, config, 'flat_subtypes');
  const json = {};
  data.data.forEach(o => { json[o.Code] = { 
    id: o.id, 
    Code: o.Code, 
    Name: o.Name, 
    Name_en: o.Name_en,
    Description: o.Description, 
    Description_en: o.Description_en,
    Amenities: o.Amenities
  } });
  return(json); 
};