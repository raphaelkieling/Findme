const mensagemDef = `
    type Mensagem{
        mensagem: String
        usuario_enviou: ID!
        usuario_recebeu: ID!
    }

    input MensagemCriarInput{
        mensagem: String
        usuario_recebeu: ID!
    }
`;

const mensagemMutation = `
    criarMensagem(input: MensagemCriarInput): Mensagem
`;

const mensagemQuery = `
    mensagemsUsuario(id:ID): [ Mensagem! ]!
`;

module.exports = {
    mensagemDef,
    mensagemMutation,
    mensagemQuery
}