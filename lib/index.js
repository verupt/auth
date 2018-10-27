import express from 'express';
import bodyParser from 'body-parser';
import errorHandler from './utils/errorHandler';

// import route files
import register from './routes/register';

const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());

// routing
app.use('/register', register);

app.use(errorHandler);
app.listen(port, () => console.log('listening on port:', port));