import express, { RequestHandler } from "express";
import { Signup } from "../controllers/userController";

// Create a router instance
export const router = express.Router();

// Define routes - use router.post, not userRoutes.post
router.post("/signup", Signup as RequestHandler);
