const usuarioQuery = require('./entities/usuario/usuario.schema').usuarioQuery;
const permissaoQuery = require('./entities/permissao/permissao.schema').permissaoQuery;
const categoriaQuery = require('./entities/categoria/categoria.schema').categoriaQuery;

const Query = `
    type Query {
        ${permissaoQuery}
        ${usuarioQuery}
        ${categoriaQuery}
    }
`;

module.exports = Query;