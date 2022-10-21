import IService from '../interfaces/IService';
import { IModel } from '../interfaces/IModel';
import { carZodSchema, ICar } from '../interfaces/ICar';

export default class CarService implements IService<ICar> {
  private _carModel: IModel<ICar>;

  constructor(model: IModel<ICar>) {
    this._carModel = model;
  }

  public async create(obj: ICar): Promise<ICar> {
    // Verifica se o obj está no formato definido pelo zodSchema
    const parsed = carZodSchema.safeParse(obj);

    // Se houve um erro de verificação, é lançado um erro
    if (!parsed.success) throw parsed.error;

    // Caso tenha sucesso, o objeto recebido por parâmetro é enviado para a model.
    return this._carModel.create(parsed.data);
  }

  public async read(): Promise<ICar[]> {
    const allCars = this._carModel.read();
    return allCars;
  }
}
