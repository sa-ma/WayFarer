import express from 'express';
import UserController from '../controllers/userController';
import validate from '../middlewares/validateInputs';

const router = express.Router();
router.use(express.json());

router.post('/signup', validate.signUp, UserController.signUp);


export default router;
