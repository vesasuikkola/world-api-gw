import apiAdapter from '../services/apiAdapter.js';
import * as analyticsService from '../services/analyticsService.js';
import { APIS } from '../config.js';

const BASE_URL = `${APIS.world_host}:${APIS.world_port}`;
const api = apiAdapter(BASE_URL);

export const get = (req, res) => {
  const jwt = req.headers.authorization;

  api
    .get(req.path, { headers: { authorization: jwt } })
    .then((worldRes) => {
      const worldData = worldRes.data;

      // update analytics if the request was for a single country
      if (req.params.code) {
        analyticsService.updateAnalytics(req.params.code, jwt);
        res.status(worldRes.status).send(worldData);
      }
      // otherwise, for request to all countries, compose analytics into the response
      else {
        let analytics;
        analyticsService.getAnalytics(null, jwt).then((analyticsRes) => {
          analytics = analyticsRes.data;
          worldData.forEach((country) => {
            const countryViews = analytics.find(
              (view) => view.countryCode === country.Code
            );
            country.views = countryViews ? countryViews.views : 0;
            country.lastView = countryViews
              ? new Date(countryViews.lastView)
              : null;
          });
          res.status(worldRes.status).send(worldData);
        });
      }
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json(error);
    });
};
