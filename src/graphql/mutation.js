const usuarioMutation = require('./entities/usuario/usuario.schema').usuarioMutation;
const permissaoMutation = require('./entities/permissao/permissao.schema').permissaoMutation;
const tokenMutation = require('./entities/token/token.schema').tokenMutations;

const Mutation = `
    type Mutation{
        ${tokenMutation}
        ${permissaoMutation}
        ${usuarioMutation}
    }
`;

module.exports = Mutation;