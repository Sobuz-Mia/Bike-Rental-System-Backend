import express, { Application, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import router from "./app";

// parsers

app.use(express.json());
app.use(cors());
// all routers here
// app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running............");
});

export default app;
