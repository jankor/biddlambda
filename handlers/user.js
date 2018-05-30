'use strict';
var randtoken = require('rand-token');
const dbService = require("../services/mysql");
const userMapper = require('../mappers/user.js');
const userServiceFactory = require('../services/user');
const facebook = require('../services/facebook');

exports.getUser = async (request, response) => {
  const db = await dbService.getInstance();
  const userService = userServiceFactory.init(db, userMapper);
  try {
    return response.status(200).json(
      await userService.getUser(request.params.token)
    );
  } catch (e) {
    console.log(e)
  }
  response.status(500);
};

exports.createUser = async (request, response) => {
  const db = await dbService.getInstance();
  const userService = userServiceFactory.init(db, userMapper);
  console.log(request.body);
  try {
    return response.status(200).json(
      await userService.insertUser(randtoken.generate(32))
    );
  } catch (e) {
    console.log(e)
  }
  response.status(500);
};

exports.authUser = async (request, response) => {
  const db = await dbService.getInstance();
  const userService = userServiceFactory.init(db, userMapper);
  try {
    return response.status(200).json(
      await userService.authFacebook(request.params.token, request.body.id, request.body.key, facebook)
    );
  } catch (e) {
    console.log(e)
  }
  response.status(500);
};
