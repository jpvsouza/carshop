import { Router } from 'express';
import CarController from '../controllers/CarController';
import CarService from '../services/CarService';
import Car from '../models/Car';

const router = Router();

const carModel = new Car();
const carService = new CarService(carModel);
const carController = new CarController(carService);

// É usado arrow function para fazer o bind do this
router.post('/', (req, res) => carController.create(req, res));
router.get('/', (req, res) => carController.read(req, res));

export default router;
