import express from 'express';
import carRouter from './router/CarRouter';
import 'express-async-errors';
import errorHandler from './middlewares/error';

const app = express();
app.use(express.json());
app.use('/car', carRouter);
app.use(errorHandler);

export default app;
