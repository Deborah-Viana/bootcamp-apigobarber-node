//Responsavel pela conexão com o DB
import sequelize, { Sequelize } from 'sequelize';

//importando os model user da aplicação
import User from '../app/models/User';
//importando os model file da aplicação
import File from '../app/models/File';
//importando os model appointments da aplicação
import Appointment from '../app/models/appointment';

//Importando as configurações do DB
import databaseConfig from '../config/database';

//Array com todos os models da aplicação
const models = [User, File, Appointment];

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
    //Um segundo array que percorre todos os models e para cada um encontrado
    // chama o metodo de associaçãoo de tabela do model user.js. Se encontrar dentro
    //de algum model o metodo associate, ele chama o metodo associate no referido model.
    //entao passo os models retornados  para o metodo.

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
    console.log(models);
  }
}

export default new Database();
