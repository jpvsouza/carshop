import express from 'express';
import carRouter from './router/CarRouter';

const app = express();
app.use('/car', carRouter);

export default app;
