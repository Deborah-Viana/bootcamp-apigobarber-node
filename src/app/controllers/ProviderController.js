import User from '../models/User'; //O provider também é um usuário
import File from '../models/File';

class ProviderController {
  async index(req, res) {
    //Retorna todos os providers
    const providers = await User.findAll({
      where: { provider: true },
      //Retorno somente os campos que desejo
      attributes: ['id', 'name', 'email', 'avatar_id'],
      //Retorna somente os campos que desejo - avatar
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    return res.json(providers);
    console.log(File);
  }
}

export default new ProviderController();
