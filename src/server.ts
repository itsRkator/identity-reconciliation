import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import "reflect-metadata";
import { applySecurity } from "./middlewares/security";
import { AppDataSource } from "./utils/db";
import mainRoute from "./routes/route";

dotenv.config();

const app: Express = express();
app.use(express.json());
applySecurity(app);

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

const PORT = process.env.PORT ?? 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
