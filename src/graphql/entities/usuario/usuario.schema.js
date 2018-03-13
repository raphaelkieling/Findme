const usuarioDef = `
    type Usuario{
        id:ID!
        usuario:String!
        senha:String!
        permissoes:[Permissao!]!
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
`;

const usuarioQuery = `
    me:Usuario
    usuarios:[Usuario!]!
    usuario(id: ID!):Usuario!
`;

const usuarioMutation = `
    criarUsuario(input:criarUsuarioInput!):Usuario!
    editarUsuario(id: ID!, input:editarUsuarioInput!):Usuario!
    deletarUsuario(id:ID!):Boolean!
`;

module.exports = {
    usuarioDef,
    usuarioMutation,
    usuarioQuery
}