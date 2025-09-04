const express = require("express");
const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser
} = require("../controllers/userController");

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
