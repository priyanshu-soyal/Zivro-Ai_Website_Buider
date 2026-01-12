// Express :-
import express, { Request, Response } from "express";
const app = express();
const port = 3000;

// dotenv :-
import dotenv from "dotenv";
dotenv.config();

// better auth
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";

// Cors :-
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import projectRouter from "./routes/projectRoutes.js";
const corsOptions = {
  origin: process.env.TRUSTED_ORIGINS?.split(",") || ["http://localhost:5173"],
  credentials: true,
};
app.use(cors(corsOptions));

// handle API requests for authentication -
app.all("/api/auth/{*any}", toNodeHandler(auth));
// app.use("/api/auth/", toNodeHandler(auth)); - if app.all() not working then use this

// Default Middleware :-
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/user", userRouter);
app.use("/api/project", projectRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
