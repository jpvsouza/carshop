import { expect } from 'chai';
import sinon from 'sinon';
import CarModel from '../../../models/Car';
import { Model } from 'mongoose';
import mongoose from 'mongoose';
import 'mongoose';
import { carMock, carMockWithId } from '../mocks/carMock';

describe('Frame Model', () => {
  const carModel = new CarModel();

  before(() => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'findOne').resolves(carMockWithId);
  });

  after(() => {
    sinon.restore();
  });

  describe('creating a car', () => {
    it('successfully created', async () => {
      const newCar = await carModel.create(carMock);
      expect(newCar).to.be.deep.equal(carMockWithId);
    });
  });

  describe('searching a car', () => {
    it('successfully found', async () => {
      const carFound = await carModel.readOne('62cf1fc6498565d94eba52cd');
      expect(carFound).to.be.deep.equal(carMockWithId);
    });

    it('car not found', async () => {
      try {
        await carModel.readOne('123ERRADO');
      } catch (error: any) {
        expect(error.message).to.be.eq('ObjectNotFound');
      }
    });
  });

  describe('updating a car', () => {
    it('successfully updated', async () => {
        sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockWithId);
        sinon.stub(mongoose, 'isValidObjectId').resolves(true);

        const updatedCar = await carModel.update('idQualquer', carMock);

        expect(updatedCar).to.be.deep.equal(carMockWithId);

        sinon.restore();
    });
    it('throws InvalidMongoId with invalid id', async () => {
        const stub = sinon.stub(mongoose, 'isValidObjectId').returns(false);
        let error;

        try {
            await carModel.update('invalid-id', carMock)
        } catch (err){
            error = err;
        }

        expect(error).not.to.be.undefined;
        expect((error as Error).message).to.be.equal('InvalidMongoId');
        stub.restore();
    })
  })

  describe('getting all cars', () => {
    it('successfully found', async () => {
      sinon.stub(Model, 'find').resolves([carMockWithId]);
      const carFound = await carModel.read();
      expect(carFound).to.be.deep.equal([carMockWithId]);
      sinon.restore();
    });
  });

  describe('remove a car', () => {
    it('successfully found and deleted', async () => {
      sinon.stub(Model, 'findByIdAndDelete').resolves(carMockWithId);
      sinon.stub(mongoose, 'isValidObjectId').resolves(true);

      const carDeleted = await carModel.delete('idAleatorio');
      expect(carDeleted).to.be.deep.equal(carMockWithId);
      
      sinon.restore();
    });

    it('throws InvalidMongoId with invalid id', async () => {
      const stub = sinon.stub(mongoose, 'isValidObjectId').returns(false);
      let error;

      try {
          await carModel.update('invalid-id', carMock)
      } catch (err){
          error = err;
      }

      expect(error).not.to.be.undefined;
      expect((error as Error).message).to.be.equal('InvalidMongoId');
      stub.restore();
  })
  });
});
