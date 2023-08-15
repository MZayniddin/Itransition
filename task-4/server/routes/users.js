import { Router } from "express";
import {
  blockUser,
  deleteUser,
  getUsers,
  unBlockUser,
} from "../controllers/usersController.js";

import { checkUserIsActive } from "../middlewares/checkUserActive.js";

const router = Router();

router.get("/", getUsers);
router.patch("/block/:userId", checkUserIsActive, blockUser);
router.patch("/unblock/:userId", checkUserIsActive, unBlockUser);
router.delete("/delete/:userId", checkUserIsActive, deleteUser);

export default router;
