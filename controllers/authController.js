import User from '../model/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { AUTH_SECRET } from '../config.js';

export const register = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send('Internal server error');
    if (user) return res.status(409).send('Email already in use');

    let hashedPassword = bcrypt.hashSync(req.body.password, 8);
    User.create(
      {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      },
      (err, user) => {
        if (err) return res.status(500).send('Registration failed');

        const token = jwt.sign({ id: user._id }, AUTH_SECRET.secret, {
          expiresIn: 86400
        });

        res.status(200).send({ auth: true, token: token });
      }
    );
  });
};

export const login = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send('Internal server error');
    if (!user) return res.status(401).send({ auth: false, token: null });

    const passwordIsValid = bcrypt.compareSync(
      req.body.password || '',
      user.password
    );
    if (!passwordIsValid)
      return res.status(401).send({ auth: false, token: null });

    const token = jwt.sign({ id: user._id }, AUTH_SECRET.secret, {
      expiresIn: 86400
    });

    res.status(200).send({ auth: true, token: token });
  });
};
