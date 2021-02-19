import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routers/router.js';
import dotenv from 'dotenv';
dotenv.config();
import db from './services/dbService.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(router);

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || 'http://localhost';
app.listen(PORT, () =>
  console.log(`Simple API Gateway running on ${HOST}:${PORT}`)
);
