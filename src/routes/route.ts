import express, { Router } from "express";
import identityRoute from "./identityRoutes";

const router: Router = express.Router();

router.use("/contacts", identityRoute);

export default router;
