const express = require("express");
const router = express.Router();
const authorisationController = require("../controllers/authorisation");
router.post("/login", authorisationController.handleLogin);
router.post("/signup", authorisationController.createAdmin);
module.exports = router;
