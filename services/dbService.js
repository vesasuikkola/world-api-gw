import mongoose from 'mongoose';
import { SECRETS } from '../config.js';

export default mongoose.connect(SECRETS.mongodb_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
