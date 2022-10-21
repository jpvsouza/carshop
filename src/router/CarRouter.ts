import { Router } from 'express';
import CarController from '../controllers/CarController';
import Car from '../models/Car';
import CarService from '../services/CarService';

const router = Router();

const carModel = new Car();
const carService = new CarService(carModel);
const carController = new CarController(carService);

// É usado arrow function para fazer o bind do this
router.post('/', (req, res) => carController.create(req, res));
router.get('/:id', (req, res) => carController.readOne(req, res));
router.get('/', (req, res) => carController.read(req, res));
router.put('/:id', (req, res) => carController.update(req, res));
router.delete('/:id', (req, res) => carController.delete(req, res));

export default router;
