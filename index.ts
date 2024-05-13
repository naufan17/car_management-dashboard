import dotenv from 'dotenv';
import express, { Express } from 'express';
import carRoute from './src/routes/carRoute';

dotenv.config();

const port: number = Number(process.env.PORT) || 5000;
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', carRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});