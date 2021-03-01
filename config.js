import dotenv from 'dotenv';
dotenv.config();

export const API_PATHS = {
  analytics_db: {
    views: 'analytics/views'
  }
};

export const AUTH_SECRET = {
  secret: process.env.AUTH_SECRET
};
