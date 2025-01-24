import { Router } from "express"; 
import { createLobby, joinLobby, deleteLobby } from "../controllers/lobby"; 
import { isAuthenticated } from "../config/passport";

const router = Router();

router.post("/createLobby", isAuthenticated, createLobby);
router.get("/joinLobby", isAuthenticated, joinLobby);
router.delete("/deleteLobby", isAuthenticated, deleteLobby);

export default router;
