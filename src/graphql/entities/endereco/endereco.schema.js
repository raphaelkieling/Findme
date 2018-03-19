const enderecoDef = `
    type Endereco{
        id:ID
        cep:String!
        latitude:String!
        longitude:String!
        logradouro:String
        numero:String
        complemento:String
        bairro:String
    }

    input EnderecoCadastroInput{
        cep:String!
        latitude:String!
        longitude:String!
        logradouro:String
        numero:String
        complemento:String
        bairro:String
    }
`;

module.exports = {
    enderecoDef
}
