const sequelize = require("../util/database");
const Sequelize = require("sequelize");
const Employee = sequelize.define("Employee", {
  image: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },

  number: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  designation: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  course: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
module.exports = Employee;
