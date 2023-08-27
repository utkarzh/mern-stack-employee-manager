const Sequelize = require("sequelize");
const databaseName = process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const sequelize = new Sequelize(databaseName, username, password, {
  host: host,
  dialect: "mysql",
});
module.exports = sequelize;
