'use strict';
module.exports = (sequelize, DataTypes) => {
  var endereco = sequelize.define('endereco', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    logradouro: {
      type: DataTypes.STRING
    },
    numero: {
      type: DataTypes.STRING
    },
    complemento: {
      type: DataTypes.STRING
    },
    bairro: {
      type: DataTypes.STRING
    },
    latitude: {
      type: DataTypes.FLOAT
    },
    longitude: {
      type: DataTypes.FLOAT
    },
    cidade: {
      type: DataTypes.STRING
    },
    estado: {
      type: DataTypes.STRING
    },
    cep: {
      type: DataTypes.STRING
    }
  }, {});
  endereco.associate = function (models) {
    // associations can be defined here   
    endereco.belongsTo(models.pessoa, { foreignKey: 'enderecoId' });
  };
  return endereco;
};