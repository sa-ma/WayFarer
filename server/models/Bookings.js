import db from './index';
import queries from './migrations/queries';

const {
  createBooking, getCurrentBooking, getUserBookings, getAllBookings, deleteBooking, getBookingId
} = queries;

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
    const values = [tripId, userId, seatNumber];
    const response = await db.query(createBooking, values);
    return response;
  }

  /**
   * @param  {object} data - input fields
   * @method get Current user booking
   * @returns {object} current user booking
   */
  static async getBooking(data) {
    const {
      userId, tripId
    } = data;
    const values = [userId, tripId];
    const response = await db.query(getCurrentBooking, values);
    return response;
  }

  /**
   * @param  {object} data - input fields
   * @method get all user bookings
   * @returns {object} current user booking
   */
  static async getUserBookings(data) {
    const {
      userId
    } = data;
    const values = [userId];
    const response = await db.query(getUserBookings, values);
    return response;
  }

  /**
  * @param  {object} data - input fields
  * @method get all bookings
  * @returns {object} all bookings
  */
  static async getAllBookings() {
    const response = await db.query(getAllBookings);
    return response;
  }

  /**
   * @param  {object} data - input fields
   * @method get booking id
   * @returns {object} get booking id
   */
  static async getBookingId(id) {
    const response = await db.query(getBookingId, [id]);
    return response;
  }

  /**
   * @param  {object} data - input fields
   * @method delete user booking
   * @returns {object} deleted booking
   */
  static async deleteBooking(data) {
    const {
      bookingId, userId
    } = data;
    const values = [bookingId, userId];
    const response = await db.query(deleteBooking, values);
    return response;
  }
}
export default Bookings;
