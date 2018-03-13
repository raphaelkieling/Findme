'use strict';
module.exports = (sequelize, DataTypes) => {
  var usuario = sequelize.define('usuario', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    usuario: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {});
  usuario.associate = function (models) {
    usuario.belongsToMany(models.permissao, { through: 'permissaoToUsuario' });
    // associations can be defined here
  };
  return usuario;
};