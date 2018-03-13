const graphql  = require('graphql-tools');
const _        = require('lodash');
const query    = require('./query');
const mutation = require('./mutation');

const usuario   = require('./entities/usuario/usuario.schema').usuarioDef;
const permissao = require('./entities/permissao/permissao.schema').permissaoDef;
const token     = require('./entities/token/token.schema').tokenDef;

const usuarioResolver   = require('./entities/usuario/usuario.resolver');
const permissaoResolver = require('./entities/permissao/permissao.resolver');

const resolvers = _.merge(usuarioResolver,permissaoResolver);

const SchemaDefinition = `
  type Schema{
    query:Query
    mutation:Mutation
  }
`;

 
module.exports = graphql.makeExecutableSchema({
    typeDefs:[
        SchemaDefinition,
        query,
        mutation,
        permissao,
        usuario,
        token
    ],
    resolvers
})