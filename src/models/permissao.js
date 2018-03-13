'use strict';
module.exports = (sequelize, DataTypes) => {
  var permissao = sequelize.define('permissao', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    nome: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  }, {});
  permissao.associate = function (models) {
    permissao.belongsToMany(models.usuario, { through: 'permissaoToUsuario' });
    // associations can be defined here
  };
  return permissao;
};