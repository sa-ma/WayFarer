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

// @route   GET api/v1/trips/
// @desc    Get All Trips and Filter trips Route
// @access  Private
router.get('/', Authenticate.verifyToken, [validate.filterTripByOrigin, validate.filterTripByDestination],
  TripController.getTrips);

// @route   PATCH api/v1/trips/:tripId
// @desc    Cancel Trip Route
// @access  Private
router.patch('/:tripId', [Authenticate.verifyAdmin, validate.cancelTrip], TripController.cancelTrip);


export default router;
