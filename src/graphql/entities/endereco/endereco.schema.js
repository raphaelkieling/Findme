const enderecoDef = `
    type Endereco{
        id:ID
        cep:String!
        latitude: Float!
        longitude: Float!
        logradouro:String
        numero:String
        complemento:String
        bairro:String
        cidade:String
        estado:String
    }

    input EnderecoCadastroInput{
        cep:String!
        latitude:String!
        longitude:String!
        logradouro:String
        numero:String
        complemento:String
        bairro:String
        cidade:String
        estado:String
    }
`;

module.exports = {
    enderecoDef
}
