const express = require('express');
const mongoose = require('mongoose');
const routerv1 = require('./routes/v1'); //get index.js from router/v1
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const connection = require('./server/database-conection')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
routerv1(app);
connection();
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`server listen on ${PORT}`);
});
