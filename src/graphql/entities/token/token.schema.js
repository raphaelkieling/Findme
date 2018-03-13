const tokenDef = `
    type Token{
        token:String!
    }
`

const tokenMutations = `
    createToken(usuario:String!, senha:String!, permissoes:[String]! ):Token
`;

module.exports =  {
    tokenDef,
    tokenMutations
}