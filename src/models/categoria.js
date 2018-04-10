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
    categoria.hasMany(models.pedido, { foreignKey: 'categoriaId' });
    categoria.belongsToMany(models.pessoa, { through: 'pessoaToCategoria' });
    
  };
  return categoria;
};