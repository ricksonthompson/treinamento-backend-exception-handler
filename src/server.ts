import dotenv from 'dotenv';
import morgan from 'morgan';
import express, { Application } from 'express';
import './configs/process';
import router from './routes/routes';

dotenv.config();

const app: Application = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.listen(process.env.PORT, () => {
  return console.log(`🚀 server running on port ${process.env.PORT}...`);
});
