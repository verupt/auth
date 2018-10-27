export default function(err, req, res, next){
  switch(err.name){
    case 'InvalidCredentials': {
      res.status(401).send({
        errorMessage: 'Invalid username or password',
        inputErrors: [
          {
            field: 'username'
          },
          {
            field: 'password'
          }
        ]
      });

      break;
    }

    case 'ValidationError': {
      const errors = err.fields.map(i => ({field: i.param, message: i.msg}));

      res.status(422).send({inputErrors: errors});
      
      break;
    }

    default: {
      if(process.env.NODE_ENV !== 'production'){
        console.log(err);
      }

      res.status(500).send({
        errorMessage: 'An unknown error occured'
      });

      break;
    }
  }
}