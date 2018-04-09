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
        id:ID!
        nome:String!
        sobrenome:String
        nascimento:String
        cpf:String
        cnpj:String
        telefone:String!
        observacao: String!
        categorias:[ID!]
        enderecos:[EnderecoEditInput!]
    }
`;

const pessoaMutation = `
    retiraCategoriaPessoa(idCategoria:ID!,idPessoa:ID!):ID!
    adicionaCategoriaPessoa(idCategoria:ID!,idPessoa:ID!):ID!
`;


module.exports = {
    pessoaDef,
    pessoaMutation
}