const mensagemDef = `
    type Mensagem{
        mensagem: String
        usuario_enviou: ID!
        usuario_recebeu: ID!
    }

    type MensagemUnico{
        mensagem: String
        usuario_enviou: Usuario!
        usuario_recebeu: Usuario!
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
    mensagemsLista: [ MensagemUnico! ]!
`;

module.exports = {
    mensagemDef,
    mensagemMutation,
    mensagemQuery
}