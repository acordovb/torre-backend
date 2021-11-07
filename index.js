var cors = require('cors')
const express = require('express')
const dotenv = require('dotenv');

dotenv.config();
const app = express()

const {
      PORT = 3000,
      NODE_ENV = 'development'
} = process.env;

app.use(cors());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST,PUT,GET,DELETE,PATCH');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, apikey');

  next();
});

app.get('/', (req, res) => {
  res.send(`App listening at http://localhost:${PORT}`)
})

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
})