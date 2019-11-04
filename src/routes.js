import { Router } from 'express'; // Importa somente a rota do express
import multer from 'multer'; //lib de upload de arquivos
import multerConfig from './config/multer'; //config de upload de arquivos

//Importando esse controle que recebe os dados pelo insomnia e cria um usuário
import UserController from './app/controllers/UserController';
//Controla a sessão usando um token de autenticação
import SessionController from './app/controllers/SessionController';
//Esse controler armazena os arquivos de avatar do usuário
import FileController from './app/controllers/FileController';
//Controla a lista de prestadores de serviços
import ProviderController from './app/controllers/ProviderController';

//importanto middleware de autenticação
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

//Rota para criação de usuário
routes.post('/users', UserController.store);
//Rota para autenticação de usuário
routes.post('/sessions', SessionController.store);
//middleware global, tudo o que vier depois dele o usará
routes.use(authMiddleware);

//Rota para edição do usuário
routes.put('/users', UserController.update);

//Rota para listar prestadores de servico do app
routes.get('/providers', ProviderController.index);

//Rota para arquivos upload, onde uso um middleware upload.single, porque
//vou subir um arquivo por vez, e no parametro o nome do campo que vou enviar a requisição
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
