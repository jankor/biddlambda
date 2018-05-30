"use strict";

const axios = require('axios');
const config = require('../config.js');

module.exports = async (userId, userToken) => {

  try {
    const appTokenRequest = await axios.get(`https://graph.facebook.com/oauth/access_token?client_id=${config.facebook.appId}&client_secret=${config.facebook.appSecret}&grant_type=client_credentials`);
    const userRequest = await axios.get(`https://graph.facebook.com/debug_token?input_token=${userToken}&access_token=${appTokenRequest.data.access_token}`);
    if (userId === userRequest.data.data.user_id) return true;
  } catch (error) {
    console.error(error);
  }
  return false;
};
