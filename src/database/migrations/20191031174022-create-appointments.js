'use strict';
//Essa  migration tem 02 relacionamentos com a tabela de usuários.

module.exports = {
  //Essa função executa a função
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('appointments', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      //Armazena a data que o agendamento vai ocorrer.
      date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      //Relacionamento entre tabela users - usuário agenda
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        //Caso esse avatar seja excluido ou alterado
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      //Relacionamento entre tabela users - prestador atende o usuário
      provider_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        //Caso esse avatar seja excluido ou alterado
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },

      //Caso seja efetuado o cancelamento, mantenho o dia de cancelamento no db
      canceled_at: {
        type: Sequelize.DATE,
      },

      //Armazenam a data de criação e edição de cada registro
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  //Caso precise rodar um rollback, essa é a função que executa isso
  down: queryInterface => {
    return queryInterface.dropTable('appointments');
  },
};
