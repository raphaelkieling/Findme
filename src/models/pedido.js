'use strict';
module.exports = (sequelize, DataTypes) => {
  var pedido = sequelize.define('pedido', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    titulo:{
      type: DataTypes.STRING,
      allowNull: false
    },
    observacao: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM,
      values: ['pendente', 'aceito', 'cancelado'],
      defaultValue: 'pendente',
      allowNull: false
    },
    dataVencimento: {
      type: DataTypes.DATE
    },
    latitude: {
      type: DataTypes.FLOAT
    },
    longitude: {
      type: DataTypes.FLOAT
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {});
  pedido.associate = function (models) {
    // associations can be defined here
    pedido.belongsTo(models.categoria, { as: 'Categoria', foreignKey: 'categoriaId' });
    pedido.belongsTo(models.usuario, { as: 'Cliente', foreignKey: 'clienteId' });
    pedido.belongsTo(models.usuario, { as: 'Profissional', foreignKey: 'profissionalId' });
  };
  return pedido;
};