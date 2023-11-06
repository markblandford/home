/* eslint-env es6 */
const serverless = require('serverless-http');
const server = require("../dist/home/server/main");

module.exports = server.app();
module.exports.handler = serverless(server.app());
