import apiAdapter from '../services/apiAdapter.js';
import { APIS } from '../config.js';

const BASE_URL = `${APIS.weather_host}:${APIS.weather_port}`;
const api = apiAdapter(BASE_URL);

export const get = (req, res) =>
  api
    .get(req.path, { headers: { authorization: req.headers.authorization } })
    .then((apiRes) => {
      res.status(apiRes.status).send(apiRes.data);
    })
    .catch((error) => res.status(500).json(error));
