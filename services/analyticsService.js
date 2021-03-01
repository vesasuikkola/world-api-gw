import apiAdapter from '../services/apiAdapter.js';
import { API_PATHS } from '../config.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.ANALYTICS_PORT || 4002;
const HOST = process.env.ANALYTICS_HOST || 'localhost';
const BASE_URL = `${HOST}:${PORT}`;
const api = apiAdapter(BASE_URL);

export default (code, jwt) =>
  api
    .put(`/${API_PATHS.analytics_db.views}/${code}`, null, {
      headers: { authorization: jwt } //FIXME: programmatic calls should use their own identity?
    })
    .catch(console.log);
