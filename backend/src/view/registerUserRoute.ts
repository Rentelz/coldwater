import { Router } from "express";
import { registerUser } from "../controller/User/registerUserController";
import authenticateUser from "../config/middleware/authenticate";
import verifyToken from "../config/middleware/verifyToken";
import { verifyUser } from "../config/middleware/verifyUser";
import { updateProfileOne } from "../controller/User/updateProfileController";
const router = Router();

router.post("/register", registerUser); // ✅ Corrected path
router.patch("/updateProfile", verifyUser, updateProfileOne); // ✅ Corrected path

export default router;
