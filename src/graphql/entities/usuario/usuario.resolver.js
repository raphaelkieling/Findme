const usuarioResolver = {
    Usuario: {
        permissoes(usuario, args, { db }) {
            return db.permissao
                .findAll({
                    include: [{
                        model: db.usuario,
                        where: { id: usuario.get('id') }
                    }]
                })
                .then((res) => res);
        }
    },
    Query: {
        usuarios(usuarios, args, { db }) {
            return db.usuario.findAll().then(res => res);
        },
        usuario(usuario, { id }, { db }) {
            return db.usuario.findById(id).then(user => {
                if (!user) throw new Error(`User with id ${id} not found`);
                return user;
            })
        }
    },
    Mutation: {
        criarUsuario(parent, { input }, { db }) {
            return db.sequelize.transaction(async (t) => {
                const user = await db.usuario.create(input, { transaction: t });
                await user.addPermissaos(input.permissoes, { transaction: t });
                return user;

            })
        },
        editarUsuario(parent, { id, input }, { db }) {
            id = parseInt(id);
            return db.sequelize.transaction((t) => {
                return db.usuario.findById(id).then((user) => {
                    if (!user) throw new Error(`User with id ${id} not found`);
                    return user.update(input, { transaction: t });
                });
            })
        },
        deletarUsuario(parent, { id }, { db }) {
            id = parseInt(id);
            return db.sequelize.transaction((t) => {
                return db.usuario.findById(id).then((user) => {
                    if (!user) throw new Error(`User with id ${id} not found`);
                    return user.destroy({ transaction: t }).then((res) => !!res);
                });
            })
        }
    }
}

module.exports = usuarioResolver;