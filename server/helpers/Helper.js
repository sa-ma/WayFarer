import 'dotenv/config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltrounds = parseInt(process.env.SALT_ROUNDS, 10);
/**
 * @class Helper
 * @description Contains method for hasing password and genrating tokens
 * @export Helper
 */
class Helper {
  /**
   * @method hashPassword
   * @description Helps to hash the user password
   * @param  {string} password - Plain password to be hashed
   * @returns {string} The hashed password
   */
  static hashPassword(password) {
    return bcrypt.hashSync(password, saltrounds);
  }

  /**
   * @method verifyPassword
   * @description Helps to compare the hashed password and plain Password
   * @param  {string} hashedpassword - Plain password to be hashed
   * @param  {string} plainPassword - The password to be compared
   * @returns {boolean} True/False indicating if password matches or Not
   */
  static verifyPassword(unHashedPassword, hashedPassword) {
    return bcrypt.compareSync(unHashedPassword, hashedPassword);
  }

  /**
   * @method generateToken
   * @description Uses the user payload to generate a unique token
   * @param {object} payload - User payloaod for generating token
   * @returns {string} Token in form of a string
   */
  static generateToken(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h'
    });
    return token;
  }

  /**
   * @method verifyToken
   * @description verifies the given token
   * @param {string} token - The token to be verified
   * @returns {object} The payload of the token
   */
  static verifyToken(token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return decoded;
  }
}

export default Helper;
