export default function(err, req, res, next){
  switch(err.name){
    case 'ValidationError': {
      const errors = err.fields.map(i => ({field: i.param, message: i.msg}));

      res.status(422).send({inputErrors: errors});
      
      break;
    }

    default: {
      console.log(err);
      res.send('Error');
    }
  }
}