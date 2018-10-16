const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.send({success: true});
});

app.listen(port, () => console.log('listening on port:', port));