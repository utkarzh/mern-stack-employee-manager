const sequelize = require("../util/database");
const Sequelize = require("sequelize");
const Admin = sequelize.define("Admin", {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
module.exports = Admin;
