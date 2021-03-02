import jwt from 'jsonwebtoken';
import { SECRETS } from '../config.js';

export default (req, res, next) => {
  if (!req.headers['authorization']) {
    auditLog(req.method, req.path, 'unauthorized', req.ip);
    return res.status(401).send('Unauthorized');
  }

  jwt.verify(req.headers['authorization'], SECRETS.auth, (err, decoded) => {
    if (err) {
      auditLog(req.method, req.path, 'unauthorized', req.ip);
      return res.status(403).send('Forbidden');
    }
    next();
    auditLog(req.method, req.path, decoded.id);
  });
};

const auditLog = (method, path, user) =>
  console.log(
    'AUDIT :',
    new Date(Date.now()).toISOString(),
    ': call to',
    method,
    path,
    'by',
    user
  );
