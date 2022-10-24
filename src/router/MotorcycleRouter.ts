import { Router } from 'express';
import MotorcycleController from '../controllers/MotorcycleController';
import Motorcycle from '../models/Motorcycle';
import MotorcycleService from '../services/MotorcycleService';

const router = Router();

const motorcycleModel = new Motorcycle();
const motorcycleService = new MotorcycleService(motorcycleModel);
const motorcycleController = new MotorcycleController(motorcycleService);

// É usado arrow function para fazer o bind do this
router.post('/', (req, res) => motorcycleController.create(req, res));
router.get('/:id', (req, res) => motorcycleController.readOne(req, res));
router.get('/', (req, res) => motorcycleController.read(req, res));
router.put('/:id', (req, res) => motorcycleController.update(req, res));
router.delete('/:id', (req, res) => motorcycleController.delete(req, res));

export default router;
