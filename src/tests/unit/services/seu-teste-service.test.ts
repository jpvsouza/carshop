import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import CarModel from '../../../models/Car';
import CarService from '../../../services/CarService';
import { carMock, carMockWithId, invalidZodCar } from '../mocks/carMock';

describe('Frame Service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(() => {
    sinon.stub(carModel, 'create').resolves(carMockWithId);
    sinon.stub(carModel, 'readOne').onCall(0).resolves(carMockWithId).onCall(1).resolves(null);
  });

  after(() => {
    sinon.restore();
  });

  describe('Creating a car', () => {
    it('Success', async () => {
      const carCreated = await carService.create(carMock);

      expect(carCreated).to.be.deep.equal(carMockWithId);
    });

    it('Failure', async () => {
      let error;

      try {
        await carService.create(invalidZodCar);
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(ZodError);
    });
  });

  describe('Find a car', () => {
    it('Success', async () => {
      const carFound = await carService.readOne(carMockWithId._id);

      expect(carFound).to.be.deep.equal(carMockWithId);
    });

    it('Failure', async () => {
      let error: any;
      try {
        await carService.readOne(carMockWithId._id);
      } catch (err: any) {
        error = err;
      }

      expect(error, 'error should be defined').not.to.be.undefined;
      expect(error.message).to.be.deep.equal(ErrorTypes.ObjectNotFound);
    });
  });

  describe('Update a car', () => {
    it('Success', async () => {
      sinon.stub(carService, 'update').resolves(carMockWithId);

      const updated = await carService.update('any-id', carMock);

      expect(updated).to.be.deep.eq(carMockWithId);

      sinon.restore();
    });

    it('Failure - Zod', async () => {
      sinon.stub(carService, 'update').resolves(carMockWithId);
      let error;

      try {
        await carService.update('any-id', { doorsQty: 1 });
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(ZodError);

      sinon.restore();
    });

    it('Failure - Car not Found', async () => {
      sinon.stub(carModel, 'update').resolves(null);
      let error: any;

      try {
        await carService.update('any-id', carMock);
      } catch (err) {
        error = err;
      }

      expect(error?.message).to.be.eq(ErrorTypes.EntityNotFound);

      sinon.restore();
    });
  });

  describe('Get all cars', () => {
    it('Success', async () => {
      sinon.stub(carModel, 'read').resolves([carMockWithId]);
      const allCars = await carService.read();

      expect(allCars).to.be.an('array');

      sinon.restore();
    })
  })
});
