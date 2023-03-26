import express from "express";
import {
  getUsers,
  registerUser,
  getLogin,
  postLogin,
} from "../controllers/usersController";

const router = express.Router();

router.get("/", getUsers);
router.post("/register", registerUser);

router.get("/login", getLogin);
router.post("/login", postLogin);

export default router;
