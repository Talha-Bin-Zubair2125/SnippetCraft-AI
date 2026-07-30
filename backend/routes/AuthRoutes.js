const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  profile,
  logoutUser,
  updateProfile,
} = require("../controllers/AuthController");
const { protect } = require("../middlewares/AuthMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.put("/update-profile", protect, updateProfile);
router.get("/profile", protect, profile);

module.exports = router;
