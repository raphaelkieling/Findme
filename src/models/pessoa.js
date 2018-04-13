'use strict';

module.exports = (sequelize, DataTypes) => {
  var pessoa = sequelize.define('pessoa', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nascimento: {
      type: DataTypes.STRING
    },
    cpf: {
      type: DataTypes.STRING
    },
    cnpj: {
      type: DataTypes.STRING
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sobrenome: {
      type: DataTypes.STRING
    },
    tipo: {
      type: DataTypes.ENUM,
      values: ['cliente', 'profissional']
    },
    observacao: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avatarMarker: DataTypes.VIRTUAL
  }, {});
  pessoa.associate = function (models) {
    pessoa.belongsToMany(models.categoria, { as: 'categorias', through: 'pessoaToCategoria' });
    pessoa.hasMany(models.endereco, { foreignKey: 'pessoaId' });
    pessoa.hasOne(models.foto, { foreignKey: 'pessoaId' });
  };
  return pessoa;
};