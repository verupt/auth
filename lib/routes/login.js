import bcrypt from 'bcrypt';
import knex from '../db';
import { Router } from 'express';
import { sanitizeBody } from 'express-validator/filter';
import jwt from 'jsonwebtoken';
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
        .then(() => knex('user_credentials').select('hash', 'id').where({ username: req.body.username }).first())
        // check if password matches
        .then(async user => {
          // throw if no user was selected
          if(!user){
            throw err;
          }

          const hashMatches = await bcrypt.compare(req.body.password, user.hash);

          if(hashMatches){
            return user;
          }else{
            throw err;
          }
        })
        // create token
        .then(user => {
          return new Promise((resolve, reject) => {
            const tokenOpt = {
              subject: user.id,
              expiresIn: '60m'
            }

            jwt.sign({}, process.env.TOKEN_SECRET, tokenOpt, (err, token) => {
              if(err){
                return reject(new Error());
              }

              resolve(token);
            });
          });
        })
        // prepare response
        .then(token => {
          // decode token, get expiration
          const tokenData = JSON.parse(new Buffer.from(token.split('.')[1], 'base64')); 

          res.send({
            'access_token': token,
            'token_type': 'bearer',
            'expires_at': new Date(tokenData.exp * 1000).toISOString().split('.')[0]+'Z'
          });
        })
        .catch(next);
    }
  )

export default route;