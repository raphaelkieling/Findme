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

                        if (!categoria) return;

                        categorias.push(categoria);
                    }

                    return categorias;
                });
        },
        async enderecos(pessoa, args, { db }) {
            return await db.endereco
                .findAll({
                    where: {
                        pessoaId: pessoa.get('id')
                    }
                });
        },
        async avatar(pessoa, args, { db }) {
            return await db.foto
                .findOne({
                    where: {
                        pessoaId: pessoa.get('id')
                    }
                })
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
        },
        adicionarFoto: (pessoa, { idPessoa, base64 }, { db }) => {
            return db.sequelize.transaction((t) => {
                return db.pessoa.findById(idPessoa)
                    .then(async (pessoa) => {
                        if (!pessoa) throw new Error(`Pessoa with id ${id} not found`);

                        let foto = await db.foto.create({ base64 }, { transaction: t });
                        pessoa.setFoto(foto);

                        return foto;
                    });
            })
        }
    }
}

module.exports = pessoaResolver;