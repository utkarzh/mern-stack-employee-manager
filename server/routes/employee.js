const express = require("express");
const router = express.Router();
const employeeControllers = require("../controllers/employee");
const jwtCheck = require("../middleware/jwtCheck");
const upload = require("../middleware/upload");
router.get("/", jwtCheck.checkAdmin, employeeControllers.getEmployees);
router.get("/:id", jwtCheck.checkAdmin, employeeControllers.getEmployee);
router.post(
  "/create",
  jwtCheck.checkAdmin,
  upload,
  employeeControllers.createEmployee
);
router.patch(
  "/:emp_id",
  jwtCheck.checkAdmin,
  upload,
  employeeControllers.updateEmployee
);
router.delete(
  "/:emp_id",
  jwtCheck.checkAdmin,
  employeeControllers.deleteEmployee
);

module.exports = router;
