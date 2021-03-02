import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import router from './routers/router.js';
import { APP } from './config.js';
import './services/dbService.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(router);

app.listen(APP.port, () =>
  console.log(`Simple API Gateway running on ${APP.host}:${APP.port}`)
);
