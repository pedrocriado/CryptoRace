import { Router } from "express"; 
import { login, register, logout, deleteAccount } from "../controllers/auth"; 

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.post("/delete", deleteAccount);

export default router;
