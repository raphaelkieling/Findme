const graphql = require('graphql-tools');

const typeDefs = `
    type User{
        id:ID!
        name:String!
        password:String!
    }

    type Query{
        users:[User!]!
    }
`;

const resolvers = {
    Query:{
        users:()=>[{
            id:1,
            name:'Raphael Kieling',
            password:'123'
        }]
    }
}

module.exports = graphql.makeExecutableSchema({
    typeDefs,
    resolvers
})