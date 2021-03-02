import express from 'express';
import isAuthorized from '../services/requestAuthenticator.js';

const router = express.Router();
router.get('/', (req, res) => res.send('Simple API Gateway'));

// Authentication
import * as auth from '../controllers/authController.js';
router.post('/register', auth.register);
router.post('/login', auth.login);

// Analytics API
import * as analyticsAPI from '../controllers/analyticsController.js';
router.get('/analytics*', isAuthorized, analyticsAPI.get);

// World API
import * as worldAPI from '../controllers/worldController.js';
router.get('/world/countries/:code', isAuthorized, worldAPI.get);
router.get('/world/countries', isAuthorized, worldAPI.get);

// Weather API
import * as weatherAPI from '../controllers/weatherController.js'
router.get('/weather*', isAuthorized, weatherAPI.get)

// TODO add separate Logging API?

export default router;
