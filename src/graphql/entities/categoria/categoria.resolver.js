const categoriaResolver = {
    Query: {
        async categorias(categoria, args, { db }) {
            return await db.categoria.findAll();
        },
        async categoria(categoria, { id }, { db }) {
            return await db.categoria.findById(id);
        }
    },
    Mutation: {
        criarCategoria(categoria, { nome, foto }, { db }) {
            return db.sequelize.transaction(async (t) => {
                return await db.categoria.create({ nome, foto }, { transaction: t });
            })
        },
        editarCategoria(categoria, { id, nome, foto }, { db }) {
            return db.sequelize.transaction((t) => {
                return db.categoria.findById(id).then(async (categoria) => {
                    if (!categoria) throw new Error(`Categoria with id ${id} not found`);
                    return await categoria.update({ nome, foto }, { transaction: t });
                });
            })
        },
        deletarCategoria(categoriaParent, { id }, { db }) {
            id = parseInt(id);

            return db.sequelize.transaction((t) => {
                return db.categoria.findById(id).then(async (categoria) => {
                    if (!categoria) throw new Error(`Categoria with id ${id} not found`);
                    await categoria.destroy({ transaction: t });

                    return id;
                });
            })
        }
    }
}

module.exports = categoriaResolver;