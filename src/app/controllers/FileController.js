import File from '../models/File';

/*Nesse controle intercepto os dados que vem do req.body dos campos
 de "originalname e filename*/

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
    });

    return res.json(file);
  }
}

export default new FileController();
