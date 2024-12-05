const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController"); // Import as an object

router.post("/login", authController.login);
router.post("/signup", authController.signup); 
router.post("/registerServiceProvider", authController.registerServiceProvider);

module.exports = router;