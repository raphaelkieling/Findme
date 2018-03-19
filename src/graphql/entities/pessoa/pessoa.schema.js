const pessoaDef = `
    type Pessoa{
        id:ID!
        nome:String!
        sobrenome:String
        nascimento:String!
        cpf:String
        cpnj:String
        telefone:String!
        tipo:String!
        categorias:[Categoria!]
        enderecos:[Endereco!]
    }

    input PessoaCreateInput{
        nome:String!
        sobrenome:String
        nascimento:String!
        cpf:String
        cpnj:String
        telefone:String!
        categorias:[ID!]        
        enderecos: [EnderecoCadastroInput!]!
    }
`;


module.exports = {
    pessoaDef
}