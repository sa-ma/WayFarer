/* eslint-disable camelcase */
import db from './index';
import queries from './migrations/queries';

const {
  createBooking, getCurrentBooking, getUserBookings, getAllBookings, deleteBooking, getbookingId
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
      trip_id, user_id, seat_number
    } = data;
    const values = [trip_id, user_id, seat_number];
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
      user_id, trip_id
    } = data;
    const values = [user_id, trip_id];
    const response = await db.query(getCurrentBooking, values);
    return response;
  }

  /**
   * @param  {object} data - input fields
   * @method get all user bookings
   * @returns {object} current user booking
   */
  static async getUserBookings(id) {
    const response = await db.query(getUserBookings, [id]);
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
  static async getbookingId(id) {
    const response = await db.query(getbookingId, [id]);
    return response;
  }

  /**
   * @param  {object} data - input fields
   * @method delete user booking
   * @returns {object} deleted booking
   */
  static async deleteBooking(data) {
    const {
      booking_id, user_id
    } = data;
    const values = [booking_id, user_id];
    const response = await db.query(deleteBooking, values);
    return response;
  }
}
export default Bookings;
