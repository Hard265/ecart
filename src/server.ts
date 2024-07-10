import express, { Express, Request, Response } from 'express';
import dotenv from "dotenv";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Clothes Shopping API');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
