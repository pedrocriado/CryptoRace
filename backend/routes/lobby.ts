import { Router } from "express"; 
import { createLobby, joinLobby } from "../controllers/lobby"; 
import { isAuthenticated } from "../config/passport";

const router = Router();

router.post("/createLobby", isAuthenticated, createLobby);
router.get("/joinLobby", isAuthenticated, joinLobby);

export default router;
