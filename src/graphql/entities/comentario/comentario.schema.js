const comentarioDef = `
    type Comentario{
        mensagem: String
        usuario_criador: Usuario!
        usuario_recebeu: Usuario!
    }

    input ComentarioCriarInput{
        mensagem: String
        usuario_recebeu: ID!
    }
`;

const comentarioMutation = `
    criarComentario(input: ComentarioCriarInput): Comentario
`;

const comentarioQuery = `
    comentariosUsuario(id:ID): [ Comentario! ]!
`;

module.exports = {
    comentarioDef,
    comentarioMutation,
    comentarioQuery
}