const pessoaDef = `
    type Pessoa{
        id:ID!
        nome:String!
        sobrenome:String
        nascimento:String
        cpf:String
        cnpj:String
        telefone:String!
        tipo:String!
        observacao: String!
        categorias:[Categoria!]
        enderecos:[Endereco!]
    }

    input PessoaCreateInput{
        nome:String!
        sobrenome:String
        nascimento:String!
        cpf:String
        cnpj:String
        observacao: String!
        telefone:String!
        categorias:[ID!]        
        enderecos: [EnderecoCadastroInput!]!
    }

    input PessoaEditInput{
        nome:String!
        sobrenome:String
        nascimento:String!
        observacao: String!
        telefone:String!
    }
`;


module.exports = {
    pessoaDef
}