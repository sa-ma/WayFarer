import db from '../models/index';
import queries from '../models/migrations/queries';

const {
  checkEmail, checkTrip, checkBooking, checkBus
} = queries;

class DbHelpers {
  /**
 * @method emailExist
 * @param {string} email - user email
 * @returns {boolean} returnUser - User object
 */
  static emailExist(email) {
    const response = db.query(checkEmail, [email]);
    return response;
  }

  /**
 * @method busExists
 * @param {string} busId - bus Id
 * @returns {object} returnBus - Bus object
 */
  static busExist(busId) {
    const response = db.query(checkBus, [busId]);
    return response;
  }

  /**
 * @method tripExists
 * @param {string} tripId - Trip Id
 * @returns {object} returnTrip - Trip object
 */
  static tripExist(tripId) {
    const response = db.query(checkTrip, [tripId]);
    return response;
  }

  /**
 * @method bookingExists
 * @param {string} bookingId , Booking Id
 * @param {string} userId , User Id
 * @returns {object} returnBooking -Boolean containing booking object
 */
  static bookingExist(bookingId, userId) {
    const response = db.query(checkBooking, [bookingId, userId]);
    return response;
  }
}

export default DbHelpers;
