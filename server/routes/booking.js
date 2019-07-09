import express from 'express';
import BookingController from '../controllers/bookingController';
import validate from '../middlewares/validateInputs';
import Authenticate from '../middlewares/auth';

const router = express.Router();
router.use(express.json());

// @route   POST api/v1/bookings/
// @desc    Create Booking Route
// @access  Private
router.post('/', [Authenticate.verifyToken, validate.createBooking], BookingController.createBooking);

// @route   GET api/v1/bookings/
// @desc    Get Booking Route
// @access  Private
router.get('/', Authenticate.verifyToken, BookingController.getAllBookings);

// @route   DELETE api/v1/bookings/:bookingId
// @desc    DELETE Booking Route
// @access  Private
router.delete('/:bookingId', [Authenticate.verifyToken, validate.deleteBooking], BookingController.deleteBooking);

export default router;
