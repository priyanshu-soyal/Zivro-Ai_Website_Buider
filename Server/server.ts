// Express :-
import express from "express";
const app = express();

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

const trustedOrigins = process.env.TRUSTED_ORIGINS?.split(",") || ["http://localhost:5173"];

const corsOptions = {
  origin: (origin: string | undefined, callback: Function) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    if (trustedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`Blocked CORS request from origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
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

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
