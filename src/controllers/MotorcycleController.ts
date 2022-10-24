import { Request, Response } from 'express';
import IService from '../interfaces/IService';
import { IMotorcyle } from '../interfaces/IMotorcycle';

export default class MotorcycleController {
  constructor(private _service: IService<IMotorcyle>) {}

  public async create(req: Request, res: Response<IMotorcyle>) {
    // O conteúdo recebido no corpo da requisição é passado para a função create da camada de serviço
    const result = await this._service.create(req.body);

    // O status 201 é retornado junto com a resposta da camada de serviço.
    // Se tiver algum problema no meio do processo, o middleware de erro teria retornado um 
    // status diferente e uma mensagem também
    return res.status(201).json(result);
  }

  public async read(_req: Request, res:Response<IMotorcyle[]>) {
    const allMotorcycles = await this._service.read();
    return res.status(200).json(allMotorcycles);
  }

  public async readOne(req: Request, res: Response<IMotorcyle>) {
    const motorcycle = await this._service.readOne(req.params.id);
    return res.status(200).json(motorcycle);
  }

  public async update(req: Request, res: Response<IMotorcyle>) {
    const updatedMotorcycle = await this._service.update(req.params.id, req.body);
    return res.status(200).json(updatedMotorcycle as IMotorcyle);
  }

  public async delete(req: Request, res: Response) {
    await this._service.delete(req.params.id);
    return res.status(204).end();
  }
}
