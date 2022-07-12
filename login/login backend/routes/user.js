const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");

router.post("/login", userController.login);
router.post("/register", userController.register);
router.put("/change-password", verifyToken, userController.changePassword);
// router.put("/change-info", verifyToken, userController.changeInfo);

module.exports = router;
