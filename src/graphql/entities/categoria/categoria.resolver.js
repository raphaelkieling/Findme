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
        criarCategoria(categoria, { nome, icone }, { db }) {
            return db.sequelize.transaction(async (t) => {
                return await db.categoria.create({ nome, foto: icone }, { transaction: t });
            })
        },
        editarCategoria(categoria, { id, nome }, { db }) {
            return db.sequelize.transaction((t) => {
                return db.categoria.findById(id).then(async (categoria) => {
                    if (!categoria) throw new Error(`Categoria with id ${id} not found`);
                    return await categoria.update({ nome, foto: icone }, { transaction: t });
                });
            })
        },
        deletarCategoria(categoriaParent, { id }, { db }) {
            id = parseInt(id);

            return db.sequelize.transaction((t) => {
                return db.categoria.findById(id).then(async (categoria) => {
                    if (!categoria) throw new Error(`Categoria with id ${id} not found`);
                    return await categoria.destroy({ transaction: t });
                });
            })
        }
    }
}

module.exports = categoriaResolver;