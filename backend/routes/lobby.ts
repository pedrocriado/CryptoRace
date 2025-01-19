import { Router } from "express"; 
import { createLobby } from "../controllers/lobby"; 
import { isAuthenticated } from "../config/passport";

const router = Router();

router.post("/createLobby", isAuthenticated, createLobby);

export default router;
