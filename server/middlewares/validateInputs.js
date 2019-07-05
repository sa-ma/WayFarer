import { check, validationResult } from 'express-validator';

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
        return res.status(400).json({ status: 'error', error: error.array() });
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
      .trim()
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
        return res.status(400).json({ status: 'error', error: error.array() });
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
        return res.status(400).json({ status: 'error', error: error.array() });
      }
      return next();
    }
  ],

};
export default validateUser;
