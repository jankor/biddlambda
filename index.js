'use strict';
var express = require('express')
var user = require('./handlers/user.js');

var app = express()
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.originalUrl, req.params, req.body);
  next()
})
 
app.get('/', (req, res) => res.send('OK'));

app.get('/user/:token', user.getUser)
app.get('/user', user.createUser)
app.post('/auth/:token', user.authUser)

app.listen(8080)