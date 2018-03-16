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
    }

    input PessoaCreateInput{
        nome:String!
        sobrenome:String
        nascimento:String!
        cpf:String
        cpnj:String
        telefone:String!
    }
`;


module.exports = {
    pessoaDef
}