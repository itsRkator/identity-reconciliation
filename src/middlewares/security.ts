import { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";

export const applySecurityMiddlewares = (app: Express) => {
  app.use(cors());
  app.use(helmet());
  app.use(morgan("combined"));
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100,
      message: "Too many requests from this IP, try again after some time!!",
    })
  );
};
