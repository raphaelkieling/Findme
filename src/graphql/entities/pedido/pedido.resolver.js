const compose = require('../../composable/composable.resolver');
const authResolver = require('../../composable/auth.resolver');
const verifyToken = require('../../composable/verify-token.resolver');
const permissionCompose = require('../../composable/permission.resolver');

const pedidoResolver = {
    Pedido: {
        categoria: async (pedido, args, { db }) => {
            return await db.categoria.findById(pedido.get('categoriaId'));
        },
        cliente: async (pedido, args, { db }) => {
            return await db.usuario.findById(pedido.get('clienteId'));
        },
        profissional: async (pedido, args, { db }) => {
            return await db.usuario.findById(pedido.get('profissionalId'));
        }
    },
    Mutation: {
        cancelarPedido: compose(authResolver, verifyToken)((parent, { id }, { db, userAuth, io }) => {
            return db.sequelize.transaction((t) => {
                return db.pedido.findById(id).then((pedido) => {
                    if (!pedido) throw new Error(`Pedido with id ${id} not found`);
                    return pedido.update({
                        status: 'cancelado'
                    }, { transaction: t });
                });
            })
        }),
        criarPedido: compose(authResolver, verifyToken)((parent, { input }, { db, userAuth, io }) => {
            return db.sequelize.transaction(async (t) => {
                const pedido = await db.pedido.create(input, { transaction: t });

                const categoria = await db.categoria.findById(input.categoriaId);
                const cliente = await db.usuario.findById(userAuth.id, {
                    include: [
                        {
                            model: db.pessoa,
                            include: db.endereco
                        }
                    ]
                });

                pedido.updateAttributes({
                    latitude: cliente.pessoa.enderecos[0].latitude,
                    longitude: cliente.pessoa.enderecos[0].longitude
                });

                pedido.setCategoria(categoria);
                pedido.setCliente(cliente);


                io.emit(`categoria-${input.categoriaId}`, {
                    pedido,
                    cliente,
                    categoria
                });

                return pedido;
            })
        }),
        editarPedido: (parent, { input }, { db, userAuth, io }) => {
            id = parseInt(input.id);
            return db.sequelize.transaction((t) => {
                return db.pedido.findById(id)
                    .then(async (pedido) => {
                        const pedido_get = await pedido.update(input, { transaction: t });
                        const categoria = await db.categoria.findById(input.categoriaId);

                        pedido_get.setCategoria(categoria);

                        return pedido_get;
                    })
            })
        }
    },
    Query: {
        pedido: (pedido, { id }, { db }) => {
            return db.pedido.findById(id)
                .then((pedido) => {
                    if (!pedido) throw new Error(`Pedido ${id} not found`);
                    return pedido;
                });
        },
        pedidos: (pedido, args, { db }) => {
            return db.pedido.findAll({
                where: {
                    status: 'pendente'
                },
                include: [{
                    model: db.categoria,
                    as: 'Categoria'
                }, {
                    model: db.usuario,
                    as: 'Cliente',
                }, {
                    model: db.usuario,
                    as: 'Profissional'
                }]

            })
                .then((pedidos) => {
                    return pedidos;
                });
        },
        pedidosFinalizados: (pedido, args, { db }) => {
            return db.pedido.findAll({
                where: {
                    status: "aceito"
                },
                include: [{
                    model: db.categoria,
                    as: 'Categoria'
                }, {
                    model: db.usuario,
                    as: 'Cliente',
                }, {
                    model: db.usuario,
                    as: 'Profissional'
                }]

            })
                .then((pedidos) => {
                    return pedidos;
                });
        },
        pedidosCategorias: async (pedido, { categoriasId }, { db }) => {
            return await db.pedido.findAll({
                where: {
                    'categoriaId': { in: categoriasId },
                    status: 'pendente'
                },
                include: [{
                    model: db.categoria,
                    as: 'Categoria'
                }, {
                    model: db.usuario,
                    as: 'Cliente',
                }, {
                    model: db.usuario,
                    as: 'Profissional'
                }]

            });
        },
        pedidosProfissional: compose(authResolver, verifyToken)((pedido, args, { db, userAuth }) => {
            return db.pedido.findAll({
                where: {
                    profissionalId: userAuth.id,
                    status: 'pendente'
                },
                include: [{
                    model: db.categoria,
                    as: 'Categoria'
                }, {
                    model: db.usuario,
                    as: 'Cliente',
                }, {
                    model: db.usuario,
                    as: 'Profissional'
                }]

            })
                .then((pedidos) => {

                    return pedidos;
                });
        }),
        pedidosCliente: compose(authResolver, verifyToken)((pedido, args, { db, userAuth }) => {
            return db.pedido.findAll({
                where: {
                    clienteId: userAuth.id,
                    status: 'pendente'
                },
                include: [{
                    model: db.categoria,
                    as: 'Categoria'
                }, {
                    model: db.usuario,
                    as: 'Cliente',
                }, {
                    model: db.usuario,
                    as: 'Profissional'
                }]

            })
                .then((pedidos) => {

                    return pedidos;
                });
        }),
        pedidosClienteFinalizados: compose(authResolver, verifyToken)((pedido, args, { db, userAuth }) => {
            return db.pedido.findAll({
                where: {
                    clienteId: userAuth.id,
                    status: 'aceito'
                },
                include: [{
                    model: db.categoria,
                    as: 'Categoria'
                }, {
                    model: db.usuario,
                    as: 'Cliente',
                }, {
                    model: db.usuario,
                    as: 'Profissional'
                }]

            })
                .then((pedidos) => {

                    return pedidos;
                });
        })
    }
}

module.exports = pedidoResolver;