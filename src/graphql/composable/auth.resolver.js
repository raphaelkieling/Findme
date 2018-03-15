const authResolver = (resolver) => {
    return (parent, args, context, info) => {
        if(context.userAuth || context.authorization){
            return resolver(parent,args,context,info);
        }

        throw new Error('Não autorizado, Token não fornecido');
    };
}

module.exports = authResolver;