/*Onde será criado o CRUD da aplicação -- O método init será chamado automaticamente pelo sequelize
 Os campos de usuário nao precisam ser uma cópia da base de dados.
  password:Sequelize.VIRTUAL, Nunca irá existir no DB esse campo.
 */

import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

//Aqui os campos que serão preenchidos pelo usuário
class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      /*É necessário passar o paramentro acima(nesse caso sequelize)
       como segundo paramentro do metodo init*/
      {
        sequelize,
      }
    );

    //Será executado antes que o usuário seja salvo. Executa o hash da senha
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });

    return this;
  }

  //Criando metodo statico de associação que recebe todos os models,
  // Ele associa entao p id da tabela file com o campo da tabela user
  //{ foreignKey: 'avatar_id' } indica qual nome do campo da tabela user vai armazenar o arquivo
  //Estou salvando uma referencia de um arquivo dentro da table de user
  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }

  //Validando senha utilizando o bcrypt, ele recebe a senha que o usuário esta tentando se autenticar
  //Retorna true or false em suas comparações.
  checkPassword(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}

export default User;
