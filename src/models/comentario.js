'use strict';
module.exports = (sequelize, DataTypes) => {
  var comentario = sequelize.define('comentario', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    mensagem: {
      type: DataTypes.STRING
    }
  }, {});
  comentario.associate = function (models) {
    comentario.belongsTo(models.usuario, { foreignKey: 'usuario_criador' });
    comentario.belongsTo(models.usuario, { foreignKey: 'usuario_recebeu' });
  };
  return comentario;
};