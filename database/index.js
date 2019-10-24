//Responsavel pela conexão com o DB
import sequelize, { Sequelize } from 'sequelize';

//importando os models da aplicação
import User from '../app/models/User';

//Importando as configurações do DB
import databaseConfig from '../config/database';

//Array com todos os models da aplicação
const models = [User];

class Database {
  constructor() {
    //Chamando o próprio metodo init
    this.init();
  }

  //Esse método faz a conexão com o bd e carrega  os models da aplicação
  //Criando uma instancia (new) conexão com o BD
  init() {
    this.connection = new Sequelize(databaseConfig);

    //Depois da conexão, percorre-se o array de models para que eles recebam a conexão
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
