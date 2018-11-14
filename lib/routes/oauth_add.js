import knex from '../db';
import { Router } from 'express';
import { body } from 'express-validator/check';
import random from 'random-number-csprng';
import checkValidation from '../utils/checkValidation';

const route = new Router();

route
  .route('/')
  .post(
    [
      body('application_name')
        .exists().withMessage('Application name is required')
        .isString().withMessage('Application name must be a string'),

      body('callback_url')
        .exists().withMessage('Callback URL is required')
        .isString().withMessage('Callback URL must be a string'),

      body('description').optional()
        .isString().withMessage('Description must be a string'),
    ],
    (req, res, next) => {
      checkValidation(req)
        .then(genUID)
        .then(id => knex('oauth_applications')
          .insert({
            id,
            application_name: req.body.application_name,
            callback_url: req.body.callback_url,
            description: req.body.description
          }))
        .then(() => res.send('done'))
        .catch(next);
    }
  )

export default route;

async function genUID(){
  const idLength = 24;
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  // create the id
  let id = '';
  while(id.length < idLength){
    const rando = await random(0, chars.length - 1);

    id += chars[rando];
  }

  // check if the id is already in use
  const count = await knex('oauth_applications').where({ id }).count();
  if(count[0].count > 0){
    // generate a new id if it is
    return genUID();
  }

  return id;
}