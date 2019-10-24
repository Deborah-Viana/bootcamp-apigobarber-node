import { Router } from 'express'; // Importa somente a rota do express

//Importando esse controle que recebe os dados pelo insomnia e cria um usuário
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
//importanto middleware de autenticação
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

//Rota para criação de usuário
routes.post('/users', UserController.store);
//Rota para autenticação de usuário
routes.post('/sessions', SessionController.store);
//middleware global, tudo o que vier depois dele o usará
routes.use(authMiddleware);

//Rota para edição
routes.put('/users', UserController.update);

export default routes;
