const usuarioQuery = require('./entities/usuario/usuario.schema').usuarioQuery;
const permissaoQuery = require('./entities/permissao/permissao.schema').permissaoQuery;
const categoriaQuery = require('./entities/categoria/categoria.schema').categoriaQuery;
const pedidoQuery = require('./entities/pedido/pedido.schema').pedidoQuery;
const comentarioQuery = require('./entities/comentario/comentario.schema').comentarioQuery;
const mensagemQuery = require('./entities/mensagem/mensagem.schema').mensagemQuery;

const Query = `
    type Query {
        ${permissaoQuery}
        ${usuarioQuery}
        ${categoriaQuery}
        ${pedidoQuery}
        ${comentarioQuery}
        ${mensagemQuery}
    }
`;

module.exports = Query;