import 'dotenv/config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/index';

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

  /**
   * @method assignSeat
   * @description assigns seat to a user based on the bus capacity and seats allocated
   * @param {number} capacity - The total number of bus seats
   * @param {array} collected - The seats allocated already
   * @returns {number} The seat allocated
   */
  static async assignSeat(trip) {
    const capacity = 14;
    const queryText = `SELECT seat_number FROM booking where trip_id = ${trip} ;`;
    const { rows } = await db.query(queryText);
    // eslint-disable-next-line camelcase
    const collected = rows.map(({ seat_number }) => seat_number);
    let arr = Array.from(Array(capacity).keys());
    arr = arr.map(i => i + 1);
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    let collect = arr.pop();
    if (collected.includes(collect)) {
      arr = arr.filter(i => collected.indexOf(i) < 0);
      if (arr.length <= 0) collect = 0;
      collect = arr.pop();
    }
    return collect;
  }
}

export default Helper;
