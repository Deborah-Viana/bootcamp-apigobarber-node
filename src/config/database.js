/*Configuração de conexão do DB, a unica coisa fora da pasta database
//Esse arquivo será acessado pela aplicação e pelo sequelize cli
//timestamps armazena numa coluna da tabela a hora de registro,
underscored = informa quero usar uma padronização de nome da tabela dessa_forma e
e underscoredAll utiliza o mesmo, porem em coluna e relacionamentos*/

module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'gobarber',

  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
