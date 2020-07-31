require('dotenv').config();
require('colors');
const express = require('express');
const cors = require('cors');
const countries = require('./routes/countries');
const globalErrorMiddleware = require('./controllers/errors');

const app = express();

app.use(cors({ credentials: false }));

app.use(express.json());

app.use('/', countries);

app.use(globalErrorMiddleware);

const PORT = process.env.PORT || 3100;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan
      .underline.bold
  )
);
