const permissaoDef = `
    type Permissao{
        id:ID!
        nome:String!
    }
`

const permissaoQuery=`
    permissoes:[Permissao!]!
    permissao(id:ID!):Permissao!
`;

const permissaoMutation=`
    criarPermissao(nome:String!):Permissao!
    deletarPermissao(id:ID!):Boolean
    editarPermissao(id:ID!,nome:String!):Permissao!
`;

module.exports = {
    permissaoDef,
    permissaoQuery,
    permissaoMutation
}