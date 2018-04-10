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
        cancelarPedido: () => {

        },
        criarPedido: (parent, { input }, { db, userAuth }) => {
            return db.sequelize.transaction(async (t) => {
                const pedido = await db.pedido.create(input, { transaction: t });


                const categoria = await db.categoria.findById(input.categoriaId);
                const cliente = await db.usuario.findById('1');

                pedido.setCategoria(categoria);
                pedido.setCliente(cliente);

                return pedido;
            })
        },
        editarPedido: () => {

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
        pedidosProfissional: compose(authResolver, verifyToken)((pedido, args, { db }) => {
            return db.pedido.findAll({
                where: {
                    profissionalId: userAuth.id
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
        pedidosClientes: compose(authResolver, verifyToken)((pedido, args, { db, userAuth }) => {
            return db.pedido.findAll({
                where: {
                    clienteId: userAuth.id
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