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
router.patch("/block", checkUserIsActive, blockUser);
router.patch("/unblock", checkUserIsActive, unBlockUser);
router.delete("/delete", checkUserIsActive, deleteUser);

export default router;
