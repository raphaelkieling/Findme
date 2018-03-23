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
    criarCategoria(nome:String!,icone:String):Categoria!    
    editarCategoria(id:ID!,nome:String!,icone:String):Categoria!
    deletarCategoria(id:ID!):Boolean   
`;


module.exports = {
    categoriaDef,
    categoriaMutation,
    categoriaQuery
}

