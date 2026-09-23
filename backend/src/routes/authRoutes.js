const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/login", (req, res, next) => authController.login(req, res, next));
router.post("/register", (req, res, next) => authController.register(req, res, next));
router.get("/me", (req, res, next) => authController.getMe(req, res, next));
router.post("/logout", (req, res, next) => authController.logout(req, res, next));

module.exports = router;
