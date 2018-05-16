const usuarioQuery = require('./entities/usuario/usuario.schema').usuarioQuery;
const permissaoQuery = require('./entities/permissao/permissao.schema').permissaoQuery;
const categoriaQuery = require('./entities/categoria/categoria.schema').categoriaQuery;
const pedidoQuery = require('./entities/pedido/pedido.schema').pedidoQuery;
const comentarioQuery = require('./entities/comentario/comentario.schema').comentarioQuery;

const Query = `
    type Query {
        ${permissaoQuery}
        ${usuarioQuery}
        ${categoriaQuery}
        ${pedidoQuery}
        ${comentarioQuery}
    }
`;

module.exports = Query;