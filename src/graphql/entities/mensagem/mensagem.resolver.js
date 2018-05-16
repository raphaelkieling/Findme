const mensagemResolver = {
    Query: {
        async mensagemsUsuario(mensagem, { id }, { db, userAuth }) {
            return await db.mensagem
                .findAll({
                    where: {
                        $or: [
                            {
                                usuario_recebeu: { $eq: userAuth.id },
                                usuario_enviou: { $eq: id }
                            },
                            {
                                usuario_recebeu: { $eq: id },
                                usuario_enviou: { $eq: userAuth.id }
                            }
                        ]
                    },

                });
        }
    },
    Mutation: {
        criarMensagem(mensagem, { input }, { db, userAuth, io }) {
            return db.sequelize.transaction(async (t) => {
                let data = await db.mensagem.create({
                    mensagem: input.mensagem,
                    usuario_enviou: userAuth.id,
                    usuario_recebeu: input.usuario_recebeu
                }, { transaction: t });

                io.emit(`chat-send-${input.usuario_recebeu}`, {
                    mensagem: input.mensagem,
                    usuario_enviou: userAuth.id,
                    usuario_recebeu: input.usuario_recebeu
                });

                return data;
            })
        }
    }
}

module.exports = mensagemResolver;