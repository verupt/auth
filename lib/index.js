import { config as dotenv } from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import errorHandler from './utils/errorHandler';

// import route files
import login from './routes/login';
import oauthReg from './routes/oauth_add';
import register from './routes/register';

// load environmental variables
dotenv();

const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());

// routing
app.use('/login', login);
app.use('/oauth', oauthReg);
app.use('/register', register);

app.use(errorHandler);
app.listen(port, () => console.log('listening on port:', port));