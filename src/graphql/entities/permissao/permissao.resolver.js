const permissaoResolver = {
    Query:{
        permissoes(parent,args,{db}){
            return db.permissao.findAll().then((permissao)=>permissao);
        }
    },
    Mutation:{
        criarPermissao(parent,args,{db}){
            return db.sequelize.transaction((t) => {
                return db.permissao.create(args, { transaction: t })
                    .then((res) => res);
            }) 
        }
    }
}

module.exports = permissaoResolver;