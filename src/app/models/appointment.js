/* O método init será chamado automaticamente pelo sequelize
 Os campos  nao precisam ser uma cópia da base de dados.
  Sequelize.VIRTUAL, Nunca irá existir no DB esse campo.
 */

import Sequelize, { Model } from 'sequelize';

class Appointment extends Model {
  static init(sequelize) {
    super.init(
      {
        //os campos que vou ter nessa tabela
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
      },
      /*É necessário passar o paramentro acima(nesse caso sequelize)
       como segundo paramentro do metodo init*/
      {
        sequelize,
      }
    );

    return this;
  }
  //Criar o metodo estatico que me permite gerar automaticamente os campos de
  //relacionamento das tabelas. Esse metodo é chamado no index do DB.
  //Tenho 02 relacionamentos com a tabela user.js, por isso é necessário colocar
  // as para dar apelido ao campo, caso o sequelize se perca.

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
  }
}

export default Appointment;
