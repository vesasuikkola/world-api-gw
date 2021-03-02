import dotenv from 'dotenv';
dotenv.config();

export const APP = {
  port: process.env.PORT || 4000,
  host: process.env.HOST || 'http://localhost'
};

export const APIS = {
  analytics_port: process.env.ANALYTICS_PORT || 4002,
  analytics_host: process.env.ANALYTICS_HOST || 'http://localhost',
  analytics_path: 'analytics/views',
  weather_port: process.env.WEATHER_PORT || 4003,
  weather_host: process.env.WEATHER_HOST || 'http://localhost',
  world_port: process.env.WORLD_PORT || 4001,
  world_host: process.env.WORLD_HOST || 'http://localhost'
};

export const SECRETS = {
  auth: process.env.AUTH_SECRET,
  mongodb_uri: process.env.MONGODB_URI
};
