'use strict';
//Adciona o campo avatar id na tabela de usuário e descreve o tipo do campo, o referencio usando uma foreikey
//uma chave estrangeira o id da tabela files
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'avatar_id', {
      type: Sequelize.INTEGER,
      references: { model: 'files', key: 'id' },
      //Caso esse avatar seja excluido ou alterado
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeCollumn('users', 'avatar_id');
  },
};
