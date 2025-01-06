import { Router } from "express"; 
import { addUser, getLeaderboard, getUserRank } from "../controllers/leaderboard"; 

const router = Router();

router.get("/", getLeaderboard);
router.post("/addScore", addUser);
router.get("/rank", getUserRank);

export default router;
