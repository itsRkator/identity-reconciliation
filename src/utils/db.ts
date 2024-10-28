import { DataSource } from "typeorm";
import { Contact } from "../entities/Contact";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.PORT ?? "5432"),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Contact],
  synchronize: true, // must be false for production
});
