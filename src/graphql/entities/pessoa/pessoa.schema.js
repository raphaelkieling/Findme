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
        avatar:Foto
        distanceToMe: Float
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
        avatar: FotoInput
        categorias:[ID!]
        enderecos:[EnderecoEditInput!]
    }
`;

const pessoaMutation = `
    retiraCategoriaPessoa(idCategoria:ID!,idPessoa:ID!):ID!
    adicionaCategoriaPessoa(idCategoria:ID!,idPessoa:ID!):ID!
    adicionarFoto(idPessoa:ID!, base64:String!):Foto!
`;


module.exports = {
    pessoaDef,
    pessoaMutation
}