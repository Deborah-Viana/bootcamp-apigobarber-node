//Esse arquivo deve verificar se o usuário está logado.

//Importando o jwt
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

//Importando o arquivo de config, onde está o segredo do token
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  //Buscando o campo onde está o token
  const authHeader = req.headers.authorization;

  //Verifica se o token nao está presente na requisição
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  //Apenas dividindo o authheader para ficar mais legivel quando enviar para outro lugar da app
  const [, token] = authHeader.split(' ');

  try {
    /*Utilizando promisify do node, que transforma uma função de calback em função async await,
    nesse caso o metodo do verify do jwt. Então nao preciso passar um calback, apenas seus paremetros,
    o token e o segredo quem vem das configurações do app, dentro do decoded deve esta o ID
    que coloquei como parametro que vem de session*/
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    //Colocando o id dentro do req acima, será acessado pelo usercontroller
    req.userId = decoded.id;

    return next();
  } catch (err) {
    //Verifica se o token é invalido
    return res.status(401).json({ error: 'Token inválid' });
  }
};
