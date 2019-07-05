import express from 'express';
import TripController from '../controllers/tripController';
import validate from '../middlewares/validateInputs';
import Authenticate from '../middlewares/auth';

const router = express.Router();
router.use(express.json());

// @route   POST api/v1/trips/
// @desc    Create Trip Route
// @access  Private
router.post('/', [Authenticate.verifyAdmin, validate.createTrip], TripController.createTrip);

export default router;
