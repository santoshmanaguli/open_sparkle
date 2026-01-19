import { Router } from "express";
import { registerClient } from "../controllers/clientOnboardingController.js";

const router = Router();

router.post("/register", registerClient);

export default router;
