const categoriaDef = `
    type Categoria{
        id:ID!
        nome:String!
        foto:String!
    }
`;


const categoriaQuery = `
    categorias:[Categoria!]!
    categoria:Categoria!
`;
    
const categoriaMutation = `
    criarCategoria(nome:String!,foto:String):Categoria!    
    editarCategoria(id:ID!,nome:String!,foto:String):Categoria!
    deletarCategoria(id:ID!):Boolean   
`;


module.exports = {
    categoriaDef,
    categoriaMutation,
    categoriaQuery
}

