'use strict';
module.exports = (sequelize, DataTypes) => {
  var pessoa = sequelize.define('pessoa', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cpnj: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sobrenome: {
      type: DataTypes.STRING
    },
    tipo: {
      type: DataTypes.ENUM,
      values: ['cliente','profissional']
    }
  }, {});
  pessoa.associate = function (models) {
    // associations can be defined here
  };
  return pessoa;
};