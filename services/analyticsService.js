import apiAdapter from '../services/apiAdapter.js';
import { APIS } from '../config.js';

const BASE_URL = `${APIS.analytics_host}:${APIS.analytics_port}`;
const api = apiAdapter(BASE_URL);

export const updateAnalytics = (code, jwt) =>
  api
    .put(`/${APIS.analytics_path}/${code}`, null, {
      headers: { authorization: jwt } //FIXME: programmatic calls should use their own identity?
    })
    .catch(console.log);

export const getAnalytics = (code, jwt) =>
  code
    ? api.get(`/${APIS.analytics_path}/${code}`, {
        headers: { authorization: jwt } //FIXME: programmatic calls should use their own identity?
      })
    : api.get(`/${APIS.analytics_path}`, {
        headers: { authorization: jwt } //FIXME: programmatic calls should use their own identity?
      });
