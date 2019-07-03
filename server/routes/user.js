import express from 'express';
import UserController from '../controllers/userController';
import validate from '../middlewares/validateInputs';

const router = express.Router();
router.use(express.json());

// @route   POST api/v1/auth/signup
// @desc    Sign up Route
// @access  Public
router.post('/signup', validate.signUp, UserController.signUp);

// @route   POST api/v1/auth/signin
// @desc    Sign in Route
// @access  Public
router.post('/signin', validate.signIn, UserController.signIn);

export default router;
