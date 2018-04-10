const usuarioMutation = require('./entities/usuario/usuario.schema').usuarioMutation;
const permissaoMutation = require('./entities/permissao/permissao.schema').permissaoMutation;
const tokenMutation = require('./entities/token/token.schema').tokenMutations;
const categoriaMutation = require('./entities/categoria/categoria.schema').categoriaMutation;
const pessoaMutation = require('./entities/pessoa/pessoa.schema').pessoaMutation;
const pedidoMutation = require('./entities/pedido/pedido.schema').pedidoMutation;

const Mutation = `
    type Mutation{
        ${tokenMutation}
        ${permissaoMutation}
        ${usuarioMutation}
        ${categoriaMutation}
        ${pessoaMutation}
        ${pedidoMutation}
    }
`;

module.exports = Mutation;