// Configuração do servidor dentro dessa classe
// Essa classe será chamada somente uma vez

import express from 'express';
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
  }

  routes() {
    // importanto rotas
    this.server.use(routes);
  }
}

// Instanciando o app, e exportando o server, porque precisamos acessar o servidor de fora da classe.
export default new App().server;
