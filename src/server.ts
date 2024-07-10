import express, { Express, Request, Response } from 'express';
import productsRoutes from './routes/productsRoutes';

import dotenv from "dotenv";
dotenv.config();




const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/products', productsRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Shopping API');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
