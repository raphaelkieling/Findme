'use strict';
module.exports = (sequelize, DataTypes) => {
  var categoria = sequelize.define('categoria', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome:{
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    foto:{
      type: DataTypes.TEXT('long')
    }
  }, {});
  categoria.associate = function(models) {
    // associations can be defined here
  };
  return categoria;
};