const categoriaDef = `
    type Categoria{
        id:ID!
        nome:String!
    }
`;


const categoriaQuery = `
    categorias:[Categoria!]!
    categoria:Categoria!
`;
    
const categoriaMutation = `
    criarCategoria(nome:String!):Categoria!    
    editarCategoria(id:ID!,nome:String!):Categoria!
    deletarCategoria(id:ID!):Boolean   
`;


module.exports = {
    categoriaDef,
    categoriaMutation,
    categoriaQuery
}

