import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import multer from "multer";

dotenv.config();

// Init Express App
const server: Application = express();

// Middleware
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Helmet (Relaxed for local dev)
if (process.env.NODE_ENV === "production") {
  server.use(helmet());
} else {
  server.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
}

// Rate Limiter (Simple Config)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
server.use(apiLimiter);

// Multer Config (Memory storage as default)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// MongoDB Connection
const mongoURI: string = process.env.MONGO_URI || "";
if (!mongoURI) {
  console.error("Error: MONGO_URI is not defined in .env");
  process.exit(1);
}

mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Start Server
const port: string = process.env.BACK_END || "8009";
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
