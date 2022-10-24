import IService from '../interfaces/IService';
import { IModel } from '../interfaces/IModel';
import { carZodSchema, ICar } from '../interfaces/ICar';
import { ErrorTypes } from '../errors/catalog';

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

  public async readOne(_id: string): Promise<ICar> {
    if (_id.length < 24) throw new Error(ErrorTypes.InvalidMongoId);
    const car = await this._carModel.readOne(_id);
    if (!car) throw new Error(ErrorTypes.ObjectNotFound);
    return car;
  }

  public async update(_id: string, obj: Partial<ICar>): Promise<ICar | null> {
    if (_id.length < 24) throw new Error(ErrorTypes.InvalidMongoId);
    
    const parsed = carZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;

    const car = await this._carModel.update(_id, obj);
    if (!car) throw new Error(ErrorTypes.ObjectNotFound);
    return car;
  }

  public async delete(_id: string): Promise<ICar | null> {
    const deletedCar = await this._carModel.delete(_id);

    if (!deletedCar) throw new Error(ErrorTypes.ObjectNotFound);

    return deletedCar;
  }
}
