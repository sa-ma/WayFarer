import db from './index';
import queries from './migrations/queries';

const { createBooking, getCurrentBooking } = queries;

/**
 * @class Bookings
 * @description contains method to handle bookings
 * @exports Bookings
 */
class Bookings {
  /**
   * @param  {object} data - input fields
   * @method createBooking
   * @returns {object} new booking
   */
  static async createBooking(data) {
    const {
      tripId, userId, seatNumber
    } = data;
    const values = [userId, tripId, seatNumber];
    const response = await db.query(createBooking, values);
    return response;
  }

  static async getBooking(data) {
    const {
      userId, tripId
    } = data;
    const values = [userId, tripId];
    const response = await db.query(getCurrentBooking, values);
    return response;
  }
}
export default Bookings;
