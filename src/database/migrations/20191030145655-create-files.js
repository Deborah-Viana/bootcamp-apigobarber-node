//nao permite nulo allowNull

'use strict';

module.exports = {
  //Essa função executa a função
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('files', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      path: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      //Armazenam a data de criação e edição de cada registro
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  //Caso precise rodar um rollback, essa é a função que executa isso
  down: queryInterface => {
    return queryInterface.dropTable('files');
  },
};
