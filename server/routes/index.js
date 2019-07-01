import express from 'express';
import userRoute from './user';

const router = express.Router();

router.get('/', (req, res) => res.json({ status: 200, message: 'Welcome to Wayfarer API' }));

router.use('/auth', userRoute);

export default router;
