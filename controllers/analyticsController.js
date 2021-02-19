import apiAdapter from '../services/apiAdapter.js';

const PORT = process.env.ANALYTICS_PORT || 4002;
const HOST = process.env.ANALYTICS_HOST || 'localhost';
const BASE_URL = `http://${HOST}:${PORT}`;
const api = apiAdapter(BASE_URL);

export const get = (req, res) =>
  api
    .get(req.path, { headers: { authorization: req.headers.authorization } })
    .then((apiRes) => {
      res.status(apiRes.status).send(apiRes.data);
    })
    .catch((error) => res.status(500).json(error));

export const put = (req, res) =>
  api
    .put(req.path, null, {
      headers: { authorization: req.headers.authorization }
    })
    .then((apiRes) => res.status(apiRes.status).send(apiRes.data))
    .catch((error) => res.status(500).json(error));
