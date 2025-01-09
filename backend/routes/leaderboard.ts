import { Router } from "express"; 
import { addUser, getLeaderboard, getUserRank } from "../controllers/leaderboard"; 
import { isAuthenticated } from "../config/passport";

const router = Router();

router.get("/", getLeaderboard);
router.post("/addScore", isAuthenticated, addUser);
router.get("/rank", isAuthenticated, getUserRank);

export default router;
