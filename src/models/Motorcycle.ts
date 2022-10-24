import { model as mongooseCreateModel, Schema } from 'mongoose';
import { IMotorcyle } from '../interfaces/IMotorcycle';
import MongoModel from './MongoModel';

const motorcycleMongooseSchema = new Schema<IMotorcyle>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  category: String,
  engineCapacity: Number,
});

motorcycleMongooseSchema.set('versionKey', false);

class Motorcycle extends MongoModel<IMotorcyle> {
  constructor(model = mongooseCreateModel('Motorcycle', motorcycleMongooseSchema)) {
    super(model);
  }
}

export default Motorcycle;
