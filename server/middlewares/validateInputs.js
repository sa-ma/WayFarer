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
    check('firstName')
      .not()
      .isEmpty()
      .withMessage('First Name required')
      .trim()
      .withMessage('First Name must contain letters only'),
    check('lastName')
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
        util.setError(400, { error: error.array() });
        return util.send(res);
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
        util.setError(400, { error: error.array() });
        return util.send(res);
      }
      return next();
    }
  ],
  createTrip: [
    check('busId')
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
    check('tripDate')
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
        util.setError(400, { error: error.array() });
        return util.send(res);
      }
      return next();
    }
  ],
  createBooking: [
    check('tripId')
      .isNumeric()
      .withMessage('Input a valid trip id'),
    (req, res, next) => {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        util.setError(400, { error: error.array() });
        return util.send(res);
      }
      return next();
    }
  ],
  deleteBooking: [
    param('bookingId')
      .isInt()
      .withMessage('Input a valid booking id'),
    (req, res, next) => {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        const { msg } = error.array().find(el => el.msg);
        util.setError(400, msg);
        return util.send(res);
      }
      return next();
    },
  ],
  cancelTrip: [
    param('tripId')
      .isInt()
      .withMessage('Input a valid trip id'),
    (req, res, next) => {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        const { msg } = error.array().find(el => el.msg);
        util.setError(400, msg);
        return util.send(res);
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
        util.setError(400, msg);
        return util.send(res);
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
        util.setError(400, msg);
        return util.send(res);
      }
      return next();
    },
  ],


};
export default validateUser;
