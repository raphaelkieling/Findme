const jwt = require('jsonwebtoken')
const JWT_SECRET = require('../utils/utils').JWT_SECRET;
const db = require('../models');

const extractJWTMiddleware = () => {
    return (req, res, next) => {
        let authorization = req.get('Authorization');
        let token = authorization ? authorization.split(' ')[1] : undefined;

        req['context'] = {};
        req['context']['authorization'] = authorization;

        if (!token) return next();

        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) { return next(); }

            db.usuario.findById(decoded.sub, {
                attributes: ['id', 'usuario']
            }).then((user) => {

                if (user) {
                    req['context']['user'] = {
                        id: user.get('id'),
                        usuario: user.get('usuario')
                    }
                }

                return next();
            })
        })

    };
};

module.exports = extractJWTMiddleware