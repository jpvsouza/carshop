import IService from '../interfaces/IService';
import { IModel } from '../interfaces/IModel';
import { motorcycleZodSchema, IMotorcycle } from '../interfaces/IMotorcycle';
import { ErrorTypes } from '../errors/catalog';

export default class MotorcycleService implements IService<IMotorcycle> {
  private _motorcycleModel: IModel<IMotorcycle>;

  constructor(model: IModel<IMotorcycle>) {
    this._motorcycleModel = model;
  }

  public async create(obj: IMotorcycle): Promise<IMotorcycle> {
    // Verifica se o obj está no formato definido pelo zodSchema
    const parsed = motorcycleZodSchema.safeParse(obj);

    // Se houve um erro de verificação, é lançado um erro
    if (!parsed.success) throw parsed.error;

    // Caso tenha sucesso, o objeto recebido por parâmetro é enviado para a model.
    return this._motorcycleModel.create(parsed.data);
  }

  public async read(): Promise<IMotorcycle[]> {
    const allMotorcycles = this._motorcycleModel.read();
    return allMotorcycles;
  }

  public async readOne(_id: string): Promise<IMotorcycle> {
    if (_id.length < 24) throw new Error(ErrorTypes.InvalidMongoId);

    const motorcycle = await this._motorcycleModel.readOne(_id);
    if (!motorcycle) throw new Error(ErrorTypes.ObjectNotFound);

    return motorcycle;
  }

  public async update(_id: string, obj: Partial<IMotorcycle>): Promise<IMotorcycle | null> {
    if (_id.length < 24) throw new Error(ErrorTypes.InvalidMongoId);

    const parsed = motorcycleZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;

    const motorcycle = await this._motorcycleModel.update(_id, obj);
    if (!motorcycle) throw new Error(ErrorTypes.ObjectNotFound);
    return motorcycle;
  }

  public async delete(_id: string): Promise<IMotorcycle | null> {
    const deletedMotorcycle = await this._motorcycleModel.delete(_id);

    if (!deletedMotorcycle) throw new Error(ErrorTypes.ObjectNotFound);

    return deletedMotorcycle;
  }
}
