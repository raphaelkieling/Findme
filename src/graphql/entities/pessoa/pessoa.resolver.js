const pessoaResolver = {
    Pessoa: {
        async categorias(pessoa, args, { db }) {
            return await db.categoria
                .findAll({
                    include: [{
                        model: db.pessoa
                    }]
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
    }
}

module.exports = pessoaResolver;