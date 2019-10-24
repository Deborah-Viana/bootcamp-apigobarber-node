//Esse controller faz registro de usuário dentro da api

//importando YUP
import * as Yup from 'yup';

//Esse controler utiliza o model de usuário, por isso foi importado
import User from '../models/User';
import { async } from 'rxjs/internal/scheduler/async';
import { updateLocale } from 'moment';

class UserController {
  //Irá receber os dados que enviamos pelo insomnia, ela faz o cadastro de usuário
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    //Verifica se o req.body está passando no schema, retorna true caso passe
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }
    //Envia apenas os nomes que o front end necessita.
    const { id, name, email, provider } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
  //Método middleware de edição do usuário, onde e feito o bloqueio caso ele nao esteja logado
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        //Se a oldPassword for preenchida, quero o campo password obrigatorio
        //A oldpassword dentro do field tem o valor da oldpassword do campo dentro de ''
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      //confirmação de senha, obriga o usuário a colocar a senha nova no campo
      //de confirmação; Esse oneoff obriga a condicional a verificar se a senha
      //digitada no campo confirm é igual a digitada no campo password
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    //Verifica se o req.body está passando no schema, retorna true caso passe
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    //Pegando os campos que o usuário irá alterar
    const { email, oldPassword } = req.body;
    //console.log(req.userId);

    //Buscando os dados dos campos acima no DB com seu id
    const user = await User.findByPk(req.userId);

    //Verifica se o email que deseja alterar é diferente do que já tem
    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }

    //Verificação de password, executa somente se o usuário desejar alterar a senha
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    //Atualizando o usuário
    const { id, name, provider } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
