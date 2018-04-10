const graphql = require('graphql-tools');
const _ = require('lodash');
const query = require('./query');
const mutation = require('./mutation');

const usuario = require('./entities/usuario/usuario.schema').usuarioDef;
const permissao = require('./entities/permissao/permissao.schema').permissaoDef;
const token = require('./entities/token/token.schema').tokenDef;
const categoria = require('./entities/categoria/categoria.schema').categoriaDef;
const pessoa = require('./entities/pessoa/pessoa.schema').pessoaDef;
const endereco = require('./entities/endereco/endereco.schema').enderecoDef;
const foto = require('./entities/foto/foto.schema').fotoDef;
const pedido = require('./entities/pedido/pedido.schema').pedidoDef;

const usuarioResolver = require('./entities/usuario/usuario.resolver');
const permissaoResolver = require('./entities/permissao/permissao.resolver');
const tokenResolver = require('./entities/token/token.resolvers');
const categoriaResolver = require('./entities/categoria/categoria.resolver');
const pessoaResolver = require('./entities/pessoa/pessoa.resolver');
const pedidoResolver = require('./entities/pedido/pedido.resolver');

const resolvers = _.merge(
  usuarioResolver
  , permissaoResolver
  , tokenResolver
  , categoriaResolver
  , pessoaResolver
  , pedidoResolver
);

const SchemaDefinition = `
  type Schema{
    query:Query
    mutation:Mutation
  }
`;


module.exports = graphql.makeExecutableSchema({
  typeDefs: [
    SchemaDefinition,
    query,
    mutation,
    foto,
    permissao,
    pessoa,
    pedido,
    usuario,
    token,
    categoria,
    endereco
  ],
  resolvers
})