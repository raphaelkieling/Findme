const pedidoDef = `
    type Pedido{
        id:ID!
        observacao:String!
        status:String!
        dataVencimento:String!
        ativo:Boolean!
        categoria:Categoria!
        cliente:Usuario!
        profissional:Usuario
    }

    input PedidoCreateInput{
        observacao:String!
        dataVencimento:String!
        categoriaId:ID!
    }

    input PedidoEditInput{
        id:ID!
        observacao:String!
        status:String!
        dataVencimento:String!
        ativo:Boolean!
    }
`;

const pedidoQuery = `
    pedido(id:ID!):Pedido
    pedidos:[Pedido!]
    pedidosProfissional:[Pedido!]
    pedidosClientes:[Pedido!] 
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