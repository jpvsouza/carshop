import { isValidObjectId, Model } from 'mongoose';
import { ErrorTypes } from '../errors/catalog';
import { IModel } from '../interfaces/IModel';

abstract class MongoModel<T> implements IModel<T> {
  protected _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }
  public async read(): Promise<T[]> {
    return this._model.find();
  }

  public async create(obj: T): Promise<T> {
    return this._model.create({ ...obj });
  }

  public async readOne(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new Error(ErrorTypes.ObjectNotFound);
    return this._model.findOne({ _id });
  }

  public async update(_id: string, obj: Partial<T>): Promise<T | null> {
    console.log('Antes: ', obj);
    if (!isValidObjectId(_id)) throw new Error(ErrorTypes.ObjectNotFound);

    const document = await this._model
      .findByIdAndUpdate(_id, obj, { new: true });

    console.log('Depois', document);
    return document;
  }

  public async delete(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new Error(ErrorTypes.ObjectNotFound);

    const result = await this._model.remove(_id);
    return result;
  }
}

export default MongoModel;
