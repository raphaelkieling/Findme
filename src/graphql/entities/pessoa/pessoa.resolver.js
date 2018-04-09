const pessoaResolver = {
    Pessoa: {
        async categorias(pessoa, args, { db }) {
            return db.pessoaToCategoria
                .findAll({
                    where: {
                        pessoaId: pessoa.get('id')
                    }
                }).then(async (res) => {
                    const categorias = [];

                    for (let i = 0; i <= res.length - 1; i++) {
                        let categoria = await db.categoria.findById(res[i].get('categoriumId'))

                        if(!categoria) return;

                        categorias.push(categoria);
                    }

                    return categorias;
                });
        },
        async enderecos(pessoa, args, { db }) {
            return await db.endereco
                .findAll({
                    where: {
                        enderecoId: pessoa.get('id')
                    }
                });
        }
    },
    Mutation: {
        retiraCategoriaPessoa: (pessoa, { idCategoria, idPessoa }, { db }) => {
            return db.sequelize.transaction((t) => {
                return db.pessoaToCategoria.findAll({
                    where: {
                        categoriumId: idCategoria,
                        pessoaId: idPessoa
                    }
                }).then((associations) => {
                    if (!associations.length > 0) throw new Error(`Not found association Categoria:${idCategoria} Pessoa:${idPessoa}`);

                    associations[0].destroy();

                    return idCategoria;
                });
            })
        },
        adicionaCategoriaPessoa: (pessoa, { idCategoria, idPessoa }, { db }) => {
            return db.sequelize.transaction((t) => {
                return db.pessoa.findById(idPessoa).then(async (pessoa) => {
                    if (!pessoa) throw new Error(`Pessoa with id ${id} not found`);

                    await pessoa.addCategoria(idCategoria, { transaction: t });

                    return idCategoria;
                });
            })
        }
    }
}

module.exports = pessoaResolver;