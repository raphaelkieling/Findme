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
    }
  }, {});
  pessoa.associate = function (models) {
    pessoa.belongsToMany(models.categoria, { through: 'pessoaToCategoria' });
    console.warn('Mudar aqui para pessoaId em vez de enderecoId linha 35 pessoa.js')
    pessoa.hasMany(models.endereco, { foreignKey: 'enderecoId' });
    pessoa.hasOne(models.foto, { foreignKey: 'pessoaId' });     
  };
  return pessoa;
};