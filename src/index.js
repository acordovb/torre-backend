var cors = require('cors')
const express = require('express')
const dotenv = require('dotenv');
const morgan = require('morgan');
const router = require('./routers');

const app = express()

dotenv.config();

const {
      PORT = 3000,
      NODE_ENV = 'development'
} = process.env;

app.use(cors());

app.use(morgan('dev'));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST,PUT,GET,DELETE,PATCH');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, apikey');

  next();
});

router(app);

app.get('/', (req, res) => {
  res.send(`App listening at ${process.env.BACKEND_URL_API}`)
})

app.listen(PORT, () => {
  console.log(`App listening at ${process.env.BACKEND_URL_API}`)
})