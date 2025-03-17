import { Router } from "express";
import { registerUser } from "../controller/User/registerUserController";

const router = Router();

router.post("/register", registerUser); // ✅ Corrected path

export default router;
