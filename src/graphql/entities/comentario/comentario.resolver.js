const comentarioResolver = {
    Comentario: {
        async usuario_criador(comentario, args, { db, userAuth }) {
            return await db.usuario
                .findOne({
                    where: {
                        id: comentario.get('usuario_criador')
                    }
                });
        },
        async usuario_recebeu(comentario, args, { db, userAuth }) {
            return await db.usuario
                .findOne({
                    where: {
                        id: comentario.get('usuario_recebeu')
                    }
                });
        }
    },
    Query: {
        async comentariosUsuario(comentario, { id }, { db, userAuth }) {
            return await db.comentario
                .findAll({
                    where: {
                        usuario_recebeu: id
                    },
                    order: [['updatedAt','DESC']]
                });
        }
    },
    Mutation: {
        criarComentario(comentario, { input }, { db, userAuth }) {
            return db.sequelize.transaction(async (t) => {
                return await db.comentario.create({
                    mensagem: input.mensagem,
                    usuario_criador: userAuth.id,
                    usuario_recebeu: input.usuario_recebeu
                }, { transaction: t });


            })
        }
    }
}

module.exports = comentarioResolver;