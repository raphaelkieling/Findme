const compose = require('../../composable/composable.resolver');
const authResolver = require('../../composable/auth.resolver');
const verifyToken = require('../../composable/verify-token.resolver');
const permissionCompose = require('../../composable/permission.resolver');

const usuarioResolver = {
    Usuario: {
        async permissoes(usuario, args, { db }) {
            return await db.permissao
                .findAll({
                    include: [{
                        model: db.usuario,
                        where: { id: usuario.get('id') }
                    }],
                });
        },
        async pessoa(usuario, args, { db }) {
            return await db.pessoa
                .findById(usuario.get('pessoaId'));
        }
    },
    Query: {
        usuarios: compose(authResolver, verifyToken, permissionCompose('user_dev', 'user_adm'))((usuarios, args, { db }) => {
            return db.usuario.findAll().then(res => res);
        }),
        usuario(usuario, { id }, { db }) {
            return db.usuario.findById(id).then(user => {
                if (!user) throw new Error(`User with id ${id} not found`);
                return user;
            })
        },
        me: compose(authResolver, verifyToken)((usuario, args, { db, userAuth }) => {
            return db.usuario.findById(userAuth.id).then(user => {
                if (!user) throw new Error(`User with id ${id} not found`);
                return user;
            })
        })
    },
    Mutation: {
        criarUsuario: compose(authResolver, verifyToken, permissionCompose('user_dev', 'user_adm'))((parent, { input }, { db }) => {
            return db.sequelize.transaction(async (t) => {
                const user = await db.usuario.create(input, { transaction: t });
                await user.addPermissaos(input.permissoes, { transaction: t });
                return user;

            })
        }),
        editarUsuario: compose(authResolver, verifyToken, permissionCompose('user_dev', 'user_adm'))((parent, { id, input }, { db }) => {
            id = parseInt(id);
            return db.sequelize.transaction((t) => {
                return db.usuario.findById(id).then((user) => {
                    if (!user) throw new Error(`User with id ${id} not found`);
                    return user.update(input, { transaction: t });
                });
            })
        }),
        criarCliente(parent, { input }, { db }) {
            input.pessoa['tipo'] = 'cliente';
            input['permissoes'] = [3];

            return db.sequelize.transaction(async (t) => {
                const user = await db.usuario.create(input, { transaction: t, include: db.pessoa });
                await user.addPermissaos(input.permissoes, { transaction: t });
                return user;
            })
        },
        criarProfissional(parent, { input }, { db }) {
            input.pessoa['tipo'] = 'profissional';
            input['permissoes'] = [4];

            return db.sequelize.transaction(async (t) => {
                const user = await db.usuario.create(input, {
                    transaction: t,
                    include: [
                        {
                            model: db.pessoa,
                            include: [{
                                model: db.endereco
                            }]
                        }
                    ]
                });

                const pessoa = user.pessoa;

                await user.addPermissaos(input.permissoes, { transaction: t });
                await pessoa.addCategoria(input.pessoa.categorias, { transaction: t });

                return user;
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