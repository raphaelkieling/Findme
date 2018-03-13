const usuarioQuery = require('./entities/usuario/usuario.schema').usuarioQuery;
const permissaoQuery = require('./entities/permissao/permissao.schema').permissaoQuery

const Query = `
    type Query {
        ${permissaoQuery}
        ${usuarioQuery}
    }
`;

module.exports = Query;