import {
  check, param, query, validationResult
} from 'express-validator';
import util from '../helpers/Util';

const validateUser = {
  signUp: [
    check('email')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Email required')
      .isEmail()
      .trim()
      .withMessage('Input a valid email address')
      .normalizeEmail(),
    check('first_name')
      .not()
      .isEmpty()
      .withMessage('First Name required')
      .trim()
      .withMessage('First Name must contain letters only'),
    check('last_name')
      .not()
      .isEmpty()
      .withMessage('Last Name required')
      .trim()
      .withMessage('Last Name can contain letters only'),
    check('password')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Password required')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Password Length should be at least 5 Characters'),

    (req, res, next) => {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return util.sendError(res, 400, { error: error.array() });
      }
      return next();
    }
  ],
  signIn: [
    check('email')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Email required')
      .isEmail()
      .withMessage('Input a valid email address')
      .normalizeEmail(),
    check('password')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Password required')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Password Length should be at least 5 Characters'),

    (req, res, next) => {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return util.sendError(res, 400, { error: error.array() });
      }
      return next();
    }
  ],
  createTrip: [
    check('bus_id')
      .isNumeric()
      .withMessage('Input a valid bus id'),
    check('origin')
      .not()
      .isEmpty()
      .withMessage('Origin is required'),
    check('destination')
      .not()
      .isEmpty()
      .withMessage('Destination is required'),
    check('trip_date')
      .isISO8601()
      .withMessage('Wrong date format is wrong')
      .isAfter(new Date().toDateString())
      .withMessage('Date must be greater than current date'),
    check('fare')
      .isNumeric()
      .withMessage('Fare must be a number'),
    (req, res, next) => {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return util.sendError(res, 400, { error: error.array() });
      }
      return next();
    }
  ],
  createBooking: [
    check('trip_id')
      .isNumeric()
      .withMessage('Input a valid trip id'),
    (req, res, next) => {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return util.sendError(res, 400, { error: error.array() });
      }
      return next();
    }
  ],
  deleteBooking: [
    param('booking_id')
      .isInt()
      .withMessage('Input a valid booking id'),
    (req, res, next) => {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        const { msg } = error.array().find(el => el.msg);
        return util.sendError(res, 400, msg);
      }
      return next();
    },
  ],
  cancelTrip: [
    param('trip_id')
      .isInt()
      .withMessage('Input a valid trip id'),
    (req, res, next) => {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        const { msg } = error.array().find(el => el.msg);
        return util.sendError(res, 400, msg);
      }
      return next();
    },
  ],
  filterTripByOrigin: [
    query('origin')
      .optional()
      .isAlpha()
      .withMessage('Input a valid origin'),
    (req, res, next) => {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        const { msg } = error.array().find(el => el.msg);
        return util.sendError(res, 400, msg);
      }
      return next();
    },
  ],
  filterTripByDestination: [
    query('destination')
      .optional()
      .isAlpha()
      .withMessage('Input a valid destination'),
    (req, res, next) => {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        const { msg } = error.array().find(el => el.msg);
        return util.sendError(res, 400, msg);
      }
      return next();
    },
  ],
};
export default validateUser;
