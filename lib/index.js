import express from 'express';
import bodyParser from 'body-parser';
import db from '../db';

const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
  db.select().from('user_credentials').then(data => res.send(data));
});

app.listen(port, () => console.log('listening on port:', port));