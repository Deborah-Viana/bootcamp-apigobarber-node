import multer from 'multer';
import crypto from 'crypto';
/*o extname(do node) tras a extensão de um arquivo, e o resolve serve para percorrer
um caminho dentro do app*/
import { extname, resolve } from 'path';

//Exportando um objeto de configuração
export default {
  //Como o multer guarda nossos arquivos de imagem
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    //formatando o nome da imagem da forma que eu quizer, mas nesse caso
    //utilizo o cripto que já vem com o node para que antes do nome do arquivo eu coloque
    //numeros aleatóriose assim padronize os arquivos no db.
    //Req: Todos os dados da requisição
    //file: Todos os dados do arquivo que o user ta fazendo upload, tamanho, nome,
    //cb:
    filename: (req, file, cb) => {
      //o 16 significa o numero de bytes que quero gerar, e utilizo um calback para pegar o resultado
      //O cb recebe um erro caso falhe, e uma resposta caso de certo.
      //O cb (3paramentro do filename) é a função que devo executar como o nome do arquivo
      //ou com erro caso haja.Caso nao, vamos chama-lo com o nome do arquivo.
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);
        //null porque nesse momento nao quero que tenha dado erro,
        //recebo o nome do arquivo de randobytes e transformo o 16 em hexadecimal
        //originalname é o exato nome que o usuário deu pro arquivo, porem uso o extname e pego somente sua extensão
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
