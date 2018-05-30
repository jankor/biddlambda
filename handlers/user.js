'use strict';
var randtoken = require('rand-token');
const dbService = require("../services/mysql");
const userMapper = require('../mappers/user.js');
const userServiceFactory = require('../services/user');

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
  try {
    return response.status(200).json(
      await userService.insertUser(randtoken.generate(32))
    );
  } catch (e) {
    console.log(e)
  }
  response.status(500);
};
