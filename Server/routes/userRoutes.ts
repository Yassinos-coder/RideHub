import express, { RequestHandler } from "express";
import { Signin, Signup } from "../controllers/userController";

// Create a router instance
export const router = express.Router();

// Define routes - use router.post, not userRoutes.post
router.post("/signup", Signup as RequestHandler);
router.post("/signin", Signin as RequestHandler);

