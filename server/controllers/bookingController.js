/* eslint-disable camelcase */
import Bookings from '../models/Bookings';
import Trips from '../models/Trips';
import util from '../helpers/Util';
import helper from '../helpers/Helper';

/**
 * @class BookingController
 * @description Controller for bookings
 * @exports BookingController
 */
class BookingController {
  /**
   * @method Create Booking
   * @description Method to create a booking
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} New Booking information
   */
  static async createBooking(req, res) {
    try {
      const { token } = req.headers;
      const { trip_id } = req.body;
      const { user_id } = helper.verifyToken(token);
      const checkTrip = await Trips.getTripStatus(trip_id);
      const { status } = checkTrip.rows.find(el => el.status) || '';
      if (status === 'cancelled') {
        util.setError(400, 'Trip is cancelled');
        return util.send(res);
      }
      const seat_number = await helper.assignSeat(trip_id);
      await Bookings.createBooking({ trip_id, user_id, seat_number });
      const { rows } = await Bookings.getBooking({ user_id, trip_id });
      util.setSuccess(201, { ...rows[0] });
      return util.send(res);
    } catch (error) {
      if (error.code === '23503') {
        util.setError(404, 'Trip not found');
        return util.send(res);
      }
      if (error.code === '23505') {
        util.setError(409, 'Trip already booked');
        return util.send(res);
      }
      util.setError(500, 'Server Error');
      return util.send(res);
    }
  }

  /**
   * @method Get Booking
   * @description Method to get All booking
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} All Booking information
   */
  static async getAllBookings(req, res) {
    try {
      const { token } = req.headers;
      const { user_id, is_admin } = helper.verifyToken(token);
      let user;
      if (!is_admin) {
        user = await Bookings.getUserBookings(user_id);
        if (user.rows.length <= 0) {
          util.setError(404, 'No bookings found');
          return util.send(res);
        }
        util.setSuccess(200, [...user.rows]);
        return util.send(res);
      }
      user = await Bookings.getAllBookings();
      util.setSuccess(200, [...user.rows]);
      return util.send(res);
    } catch (error) {
      util.setError(500, 'Server Error');
      return util.send(res);
    }
  }

  /**
   * @method Delete Booking
   * @description Method to delete booking
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} Deleted booking information
   */
  static async deleteBooking(req, res) {
    try {
      const { token } = req.headers;
      const { user_id } = helper.verifyToken(token);
      const booking_id = parseInt(req.params.booking_id, 10);
      const result = await Bookings.deleteBooking({ booking_id, user_id });
      if (result.rowCount < 1) {
        util.setError(404, 'Booking not found');
        return util.send(res);
      }
      util.setSuccess(200, { message: 'Booking cancelled successfully' });
      return util.send(res);
    } catch (error) {
      util.setError(500, 'Server Error');
      return util.send(res);
    }
  }
}
export default BookingController;
