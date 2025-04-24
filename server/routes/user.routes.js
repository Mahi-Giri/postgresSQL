import { Router } from "express";
import {
    createUser,
    deleteUser,
    getAllUsers,
    getUser,
    updateUser,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/createUser", createUser);
router.get("/getUser/:id", getUser);
router.get("/getAllUsers", getAllUsers);
router.put("/updateUser/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);

export default router;
