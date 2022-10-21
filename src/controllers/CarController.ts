import { Request, Response } from 'express';
import IService from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

export default class CarController {
  constructor(private _service: IService<ICar>) {}

  public async create(req: Request, res: Response<ICar>) {
    // O conteúdo recebido no corpo da requisição é passado para a função create da camada de serviço
    const result = await this._service.create(req.body);

    // O status 201 é retornado junto com a resposta da camada de serviço.
    // Se tiver algum problema no meio do processo, o middleware de erro teria retornado um 
    // status diferente e uma mensagem também
    return res.status(201).json(result);
  }

  public async read(_req: Request, res:Response<ICar[]>) {
    const allCars = await this._service.read();
    return res.status(200).json(allCars);
  }

  public async readOne(req: Request, res: Response<ICar>) {
    const car = await this._service.readOne(req.params.id);
    return res.status(200).json(car);
  }
}
