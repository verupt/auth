import bcrypt from 'bcrypt';
import knex from '../db';
import { Router } from 'express';
import { sanitizeBody } from 'express-validator/filter';
import checkValidation from '../utils/checkValidation';

const route = new Router();

route
  .route('/')
  .post(
    [
      sanitizeBody('username')
        .normalizeEmail({ lowercase: true }),
    ],
    (req, res, next) => {
      // create error to throw if credentials are incorrect
      const err = new Error('Username or password is incorrect');
      err.name = 'InvalidCredentials';

      checkValidation(req)
        // select user from db
        .then(() => knex('user_credentials').select('hash', 'username').where({ username: req.body.username }).first())
        // check if user exists
        .then(result => {
          if(!result){
            throw err;
          }

          return result;
        })
        // check if password matches
        .then(result => bcrypt.compare(req.body.password, result.hash))
        .then(hashMatch => {
          if(!hashMatch){
            throw err;
          }
        })
        .then(() => res.send('login successful'))
        .catch(next);
    }
  )

export default route;