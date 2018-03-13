
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../../utils/utils').JWT_SECRET;

const verifyTokenResolver = (resolver) => {
    return (parent,args,context,info)=>{
        const token = context.authorization ? context.authorization.split(' ')[1] : undefined;

        return jwt.verify(token,JWT_SECRET,(err,decoded)=>{
            if(!err){
                return resolver(parent,args,context,info);
            }

            throw new Error(`${err.name} : ${err.message}`);
        })
    }
}

module.exports = verifyTokenResolver;