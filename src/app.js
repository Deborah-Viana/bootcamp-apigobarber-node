// Configuração do servidor dentro dessa classe
// Essa classe será chamada somente uma vez

import express from 'express';
import path from 'path';
import routes from './routes';

//importando a configuração do DB
import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  // app pronta para receber requisições em formato JSON
  middlewares() {
    this.server.use(express.json());
    //usando o static do node para servir arquivos staticos para essa rota
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    // importando rotas
    this.server.use(routes);
  }
}

/* Instanciando o app, e exportando o server,
 porque precisa-se acessar o servidor de fora da classe.*/
export default new App().server;
