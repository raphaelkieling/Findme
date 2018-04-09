'use strict';

module.exports = (sequelize, DataTypes) => {
  var pessoaToCategoria = sequelize.define('pessoaToCategoria', {
    categoriumId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    pessoaId:{
        type: DataTypes.INTEGER,
        primaryKey: true
    }
  }, {});
  pessoaToCategoria.associate = function (models) {};

  return pessoaToCategoria;
};