import bcrypt from 'bcrypt';
import knex from '../db';
import { Router } from 'express';
import { body } from 'express-validator/check';
import { sanitizeBody } from 'express-validator/filter';
import random from 'random-number-csprng';
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
      // hash password and gen id
      .then(() => Promise.all([bcrypt.hash(req.body.password, 10), genUID()]))
      // insert into database
      .then(results => knex('user_credentials').insert({ id: results[1], username: req.body.username, hash: results[0] }))
      .then(() => res.send('done'))
      .catch(next);
  });

export default route;

async function genUID(){
  const idLength = 16;
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  // create the id
  let id = '';
  while(id.length < idLength){
    const rando = await random(0, chars.length - 1);

    id += chars[rando];
  }

  // check if the id is already in use
  const count = await knex('user_credentials').where({ id }).count();
  if(count[0].count > 0){
    // generate a new id if it is
    return genUID();
  }

  return id;
}