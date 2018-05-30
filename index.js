'use strict';
var express = require('express')
var user = require('./handlers/user.js');
var app = express()
 
app.get('/', (req, res) => res.send('OK'));

app.get('/user/:key/:token', user.getUser)
app.get('/user', user.createUser)

app.listen(8080)