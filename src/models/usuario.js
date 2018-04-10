'use strict';

const bcryptjs = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  var usuario = sequelize.define('usuario', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
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
  }, {
      hooks: {
        beforeCreate: (user, options) => {
          const salt = bcryptjs.genSaltSync();
          user.senha = bcryptjs.hashSync(user.senha, salt);
        },
        beforeUpdate: (user, options) => {
          if (user.changed('senha')) {
            const salt = bcryptjs.genSaltSync();
            user.senha = bcryptjs.hashSync(user.senha, salt);
          }
        }
      }
    });
  usuario.associate = function (models) {
    // associations can be defined here
    usuario.belongsToMany(models.permissao, { through: 'permissaoToUsuario' });
    usuario.belongsTo(models.pessoa);
    usuario.hasMany(models.pedido, { foreignKey: 'clienteId' });
    usuario.hasMany(models.pedido, { foreignKey: 'profissionalId' });
  };

  usuario.prototype.isPassword = (senhaCodificada, senha) => {
    return bcryptjs.compareSync(senha, senhaCodificada);
  }

  return usuario;
};