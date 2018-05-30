'use strict';
const arango = require("../services/arango");
const aql = require("arangojs").aql;
const userDocument = require('../objects/user.js');
const userServiceFactory = require('../services/user');

exports.getUser = async (request, response) => {
  const userService = userServiceFactory.init(arango.getInstance(), aql);
  try {
    return response.status(200).json(
      await userService.getUser(request.params.key, request.params.token)
    );
  } catch (e) {
    console.log(e)
  }
  response.status(500);
};

exports.createUser = async (request, response) => {
  const userService = userServiceFactory.init(arango.getInstance(), aql);
  try {
    return response.status(200).json(
      await userService.insertUser(userDocument)
    );
  } catch (e) {
    console.log(e)
  }
  response.status(500);
};
