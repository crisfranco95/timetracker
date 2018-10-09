var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');

var mongoose = require('mongoose');
var cors = require('cors');
require('dotenv').config()

mongoose.connect(process.env.DB, { useNewUrlParser: true });

app.use(cors());

var port = process.env.PORT;


var auth = require('./app/routes/v1/auth/auth');
var task = require('./app/routes/v1/task/task');
var project = require('./app/routes/v1/project/project');

//MORGAN PARA MOSTRAR EN LA CONSOLA TODAS LAS PETICIONES HECHAS AL SERVIDOR
app.use(morgan('dev'));

app.use(bodyParser.json());

//parse application/vnd.api+json as json
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}));

//v1 APIs
app.use('/api/v1/auth', auth);
//Authentication required APIs
app.use('/api/v1/task', task);
app.use('/api/v1/project', project);

app.listen(8082);
console.log('Magic happens at http://localhost:' + port);

