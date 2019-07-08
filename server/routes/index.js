import express from 'express';
import userRoute from './user';
import tripRoute from './trip';
import bookingRoute from './booking';

const router = express.Router();

// @route   GET api/v1/auth/
// @desc    Index Route
// @access  Public
router.get('/', (req, res) => res.json({ status: 200, data: 'Welcome to Wayfarer API' }));

router.use('/auth', userRoute);
router.use('/trips', tripRoute);
router.use('/bookings', bookingRoute);

export default router;
