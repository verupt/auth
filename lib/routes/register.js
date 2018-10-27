import bcrypt from 'bcrypt';
import knex from '../db';
import { Router } from 'express';
import { body } from 'express-validator/check';
import { sanitizeBody } from 'express-validator/filter';
import checkValidation from '../utils/checkValidation';

const route = new Router();

route
  .route('/')
  .post(
    [
      // sanitize email
      sanitizeBody('username')
        .normalizeEmail({ lowercase: true }),

      // set body validation
      body('username')
        .exists().withMessage('Email is required')
        .isEmail().withMessage('Not a valid email')
        .custom(async value => {
          return knex('user_credentials').where({ username: value }).count().then(count => count[0].count <= 0);
        }).withMessage('Email already registered'),

      body('password')
        .exists().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Must be at least 8 characters')
        .isString()
    ],
    (req, res, next) => {
    // check validation
    checkValidation(req)
      // hash password
      .then(() => bcrypt.hash(req.body.password, 10))
      // insert into database
      .then(hash => knex('user_credentials').insert({ username: req.body.username, hash: hash }))
      .then(() => res.send('done'))
      .catch(next);
  });

export default route;