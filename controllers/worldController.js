import apiAdapter from '../services/apiAdapter.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.WORLD_PORT || 4001;
const HOST = process.env.WORLD_HOST || 'localhost';
const BASE_URL = `http://${HOST}:${PORT}`;
const api = apiAdapter(BASE_URL);

export const get = (req, res) =>
  api
    .get(req.path, { headers: { authorization: req.headers.authorization } })
    .then((apiRes) => {
      res.status(apiRes.status).send(apiRes.data);
    })
    .catch((error) => res.status(500).json(error));
