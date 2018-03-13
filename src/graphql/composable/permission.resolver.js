const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../../utils/utils').JWT_SECRET;
const db = require('../../models');

const permissionResolver = (...permissions) => {
    return (resolver) => {
        return (parent, args, context, info) => {
            const token = context.authorization ? context.authorization.split(' ')[1] : undefined;

            return jwt.verify(token, JWT_SECRET, async (err, decoded) => {
                if (err) {
                    throw new Error(`${err.name} : ${err.message}`);
                }

                const idUsuario = decoded.sub;
                
                const permissoesVinculdas = await db.permissao.findAll({
                    include:[{
                        model:db.usuario,
                        where:{ id: idUsuario }
                    }]
                });

                console.log(permissoesVinculdas);
                
                return resolver(parent, args, context, info);
            });


        }
    }
}

module.exports = permissionResolver;