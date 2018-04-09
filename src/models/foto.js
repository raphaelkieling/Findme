'use strict';
module.exports = (sequelize, DataTypes) => {
  var foto = sequelize.define('foto', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    base64: {
      type: DataTypes.TEXT('long')
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {});
  foto.associate = function (models) {
    // associations can be defined here
    foto.belongsTo(models.pessoa, { foreignKey: 'pessoaId' });
  };
  return foto;
};