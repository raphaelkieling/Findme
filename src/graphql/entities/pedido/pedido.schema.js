const pedidoDef = `
    type Pedido{
        id:ID!
        observacao:String!
        status:String!
        dataVencimento:String!
        ativo:Boolean!
        categoria:Categoria!
        cliente:Usuario!
        titulo:String!
        profissional:Usuario
        latitude: Float!
        longitude: Float!
    }

    input PedidoCreateInput{
        observacao:String!
        dataVencimento:String!
        categoriaId:ID!
        titulo:String!
    }

    input PedidoEditInput{
        id:ID!
        observacao:String!
        status:String!
        dataVencimento:String!
        ativo:Boolean!
        titulo:String!
        latitude: Float!
        longitude: Float!
    }
`;

const pedidoQuery = `
    pedidosCategorias(categoriasId:[ID!]!):[Pedido!]
    pedido(id:ID!):Pedido
    pedidos:[Pedido!]
    pedidosProfissional:[Pedido!]
    pedidosCliente:[Pedido!] 
`;

const pedidoMutation = `
    cancelarPedido(idPedido:ID!):Boolean!
    criarPedido(input:PedidoCreateInput!):Pedido!
    editarPedido(input:PedidoEditInput!):Pedido!
`;

module.exports = {
    pedidoDef,
    pedidoQuery,
    pedidoMutation
}