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
        return res.status(400).json({ errors: error.array() });
      }
      return next();
    }
  ]
};
export default validateUser;
