import dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
import "reflect-metadata";
import { applySecurityMiddlewares } from "./middlewares/security";
import { AppDataSource } from "./utils/db";
import mainRoute from "./routes/route";
import { errorHandler } from "./utils/errorHandler";

const app: Express = express();
app.use(express.json());
applySecurityMiddlewares(app);

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully!!");
  })
  .catch((err) => {
    console.error(`Failed to connect to database. Error: ${err.message}`);
  });

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "App is running..." });
});

app.use("/api/", mainRoute);
app.use(errorHandler);

const PORT = process.env.PORT ?? 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
