const arangodb = require("arangojs");
const config = require('../config.js');

exports.getInstance = () => {
  if (!global.arangodbInstance) {
    const db = new arangodb.Database({
      url: config.arangodb.url
    });
    db.useDatabase(config.arangodb.db);
    db.useBasicAuth(config.arangodb.user, config.arangodb.pw);
    global.arangodbInstance = db;
  }

  return global.arangodbInstance;
};