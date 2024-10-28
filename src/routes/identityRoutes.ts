import express, { Router } from "express";
import { identify } from "../controllers/contactController";

const router: Router = express.Router();

router.post("/identity", identify);

export default router;
