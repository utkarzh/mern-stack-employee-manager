const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const sequelize = require("./util/database");
const authorisationRoutes = require("./routes/authorisation");
const employeeRoutes = require("./routes/employee");
app.use(cors()); //to be fixed later;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/employee", employeeRoutes);
app.use(authorisationRoutes);
sequelize.sync({ force: false }).then(() => {
  app.listen(process.env.PORT || 5000);
});
