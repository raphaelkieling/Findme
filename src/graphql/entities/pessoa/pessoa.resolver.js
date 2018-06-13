const haversine = require('haversine')

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
        async distanceToMe(pessoa, args, { db, userAuth }) {
            let enderecoPessoa = await db.endereco
                .findOne({
                    where: {
                        pessoaId: pessoa.get('id')
                    }
                });

            let usuario = await db.usuario
                .findById(userAuth.id, {
                    include: [{
                        model: db.pessoa
                    }],
                })

            if (!usuario.pessoa) return 0;

            let enderecoPessoaLogada = await db.endereco
                .findOne({
                    where: {
                        pessoaId: usuario.pessoa.id
                    }
                });

            return haversine(enderecoPessoa, enderecoPessoaLogada).toFixed(3)
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