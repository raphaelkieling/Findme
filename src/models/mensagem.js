'use strict';
module.exports = (sequelize, DataTypes) => {
  var mensagem = sequelize.define('mensagem', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    mensagem: {
      type: DataTypes.STRING
    }
  }, {});
  mensagem.associate = function(models) {
    mensagem.belongsTo(models.usuario, { foreignKey: 'usuario_enviou' });
    mensagem.belongsTo(models.usuario, { foreignKey: 'usuario_recebeu' });
  };
  return mensagem;
};