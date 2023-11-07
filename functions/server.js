/* eslint-env es6 */
const serverless = require('serverless-http');
const server = require("../dist/home/server/main");

const app = server.app();

module.exports = app;
module.exports.handler = serverless(app);
