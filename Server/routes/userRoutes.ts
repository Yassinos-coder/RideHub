import express from 'express';
import { registerUser, loginUser } from '../controllers/userController';
import { sanitizeInputs, handleValidationErrors } from '../middlewares/validateAndSanitize';

const router = express.Router();

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post('/register', sanitizeInputs, handleValidationErrors, registerUser);

// @route   POST /api/users/login
// @desc    Log in user
// @access  Public
router.post('/login', sanitizeInputs, handleValidationErrors, loginUser);

export default router;
