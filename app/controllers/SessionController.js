import jwt from 'jsonwebtoken'; //Autenticação JWT
//importando YUP
import * as Yup from 'yup';
import User from '../models/User'; //Importando novamente o modelo de usuário
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(),
    });

    //Verifica se o req.body está passando no schema, retorna true caso passe
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { email, password } = req.body;

    //Verifica todos os emails informados e armazena em user
    const user = await User.findOne({ where: { email } });

    //Verificação se o usuário com esse email informado não existe
    if (!user) {
      return res.status(401).json({ Error: 'User not found' });
    }

    /*Verificaçao da senha(se a senha NÃO "bate"), com o metodo checkPassword vindo de user.js,
     é assincrino o metodo compare por isso retorno com await*/
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }
    //Esses são os dados que quero retornar quando der tudo certo no login do usuário
    const { id, name } = user;

    //Retorno um objeto
    //Primeiro paramentro do token envio um payloader
    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
