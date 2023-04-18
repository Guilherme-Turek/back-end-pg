import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { userRoutes } from "./routes/user.routes";
import { DatabaseConnection } from "./database/config/database.connection";
import "reflect-metadata";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("", userRoutes());

DatabaseConnection.connect().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`API está rodando na porta... ${process.env.PORT!}`);
  });
});
