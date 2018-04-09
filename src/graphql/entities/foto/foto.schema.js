const fotoDef = `
    type Foto{
        id:ID!
        base64:String!
        ativo:Boolean!
    }

    input FotoInput{
        id:ID!
        base64:String
    }
`;

module.exports = {
    fotoDef
}