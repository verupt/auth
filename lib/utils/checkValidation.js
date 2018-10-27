import { validationResult } from 'express-validator/check';

export default req => new Promise((resolve, reject) => {
  const validation = validationResult(req);

  if(validation.isEmpty()){
    resolve();
  }

  // create error to throw
  const err = new Error('Validation Error');
  err.name = 'ValidationError';
  err.fields = validation.array({onlyFirstError: true});

  reject(err);
});