/*Onde será criado o CRUD da aplicação -- O método init será chamado automaticamente pelo sequelize
 Os campos de usuário nao precisam ser uma cópia da base de dados.
  password:Sequelize.VIRTUAL, Nunca irá existir no DB esse campo.
 */

import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.BOOLEAN,
        url: {
          type: Sequelize.VIRTUAL,
          //formatando o retorno desse campo
          get() {
            return `http://localhost:3333/files/${this.path}`;
          },
        },
      },
      /*É necessário passar o paramentro acima(nesse caso sequelize)
       como segundo paramentro do metodo init*/
      {
        sequelize,
      }
    );

    return this;
  }
}

export default File;
