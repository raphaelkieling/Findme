const usuarioDef = `
    type Usuario{
        id:ID!
        usuario:String!
        senha:String!
        permissoes:[Permissao!]!
        pessoa:Pessoa
        ativo:Boolean!
    }

    input criarUsuarioInput{
        usuario:String!
        senha:String!
        permissoes:[ID!]
    }
    
    input editarUsuarioInput{
        usuario:String!
        ativo:Boolean!
    }

    input criarClienteInput{
        usuario:String!
        senha:String!
        pessoa:PessoaCreateInput!
    }

    input criarProfissionalInput{
        usuario:String!
        senha:String!
        pessoa:PessoaCreateInput!
    }

    input editaProfissionalInput{
        usuario:String!
        pessoa:PessoaEditInput!
    }

    input editaClienteInput{
        usuario:String!
        pessoa:PessoaEditInput!
    }
`;

const usuarioQuery = `
    me:Usuario
    usuarios:[Usuario!]!
    usuario(id:ID!):Usuario!
`;

const usuarioMutation = `
    criarUsuario(input:criarUsuarioInput!):Usuario!
    criarCliente(input:criarClienteInput!):Usuario!
    criarProfissional(input:criarProfissionalInput!):Usuario!
    editarProfissional(input:editaProfissionalInput!):Usuario!
    editarUsuario(id: ID!, input:editarUsuarioInput!):Usuario!
    editarSenha(senha:String!):Boolean!
    ativarUsuario(id:ID!):ID!
    desativarUsuario(id:ID!):ID!
`;

module.exports = {
    usuarioDef,
    usuarioMutation,
    usuarioQuery
}