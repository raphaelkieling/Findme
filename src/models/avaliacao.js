'use strict';
module.exports = (sequelize, DataTypes) => {
  var avaliacao = sequelize.define('avaliacao', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    avaliacao: {
      type: DataTypes.STRING
    }
  }, {});
  avaliacao.associate = function (models) {
    avaliacao.belongsTo(models.usuario, { foreignKey: 'usuario_criador' });
    avaliacao.belongsTo(models.usuario, { foreignKey: 'usuario_recebeu' });
  };
  return avaliacao;
};