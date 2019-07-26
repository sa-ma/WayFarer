/* eslint-disable camelcase */
import Bookings from '../models/Bookings';
import Trips from '../models/Trips';
import util from '../helpers/Util';
import helper from '../helpers/Helper';
import exists from '../helpers/dbHelper';

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
        return util.sendError(res, 400, 'Trip is cancelled');
      }
      let response = await exists.tripExist(trip_id);
      if (response.rowCount <= 0) {
        return util.sendError(res, 404, 'Trip not found');
      }
      response = await exists.bookingExist(trip_id, user_id);
      if (response.rowCount >= 1) {
        return util.sendError(res, 409, 'Trip already booked');
      }
      const seat_number = await helper.assignSeat(trip_id);
      await Bookings.createBooking({ trip_id, user_id, seat_number });
      const { rows } = await Bookings.getBooking({ user_id, trip_id });
      return util.sendSuccess(res, 201, { ...rows[0] });
    } catch (error) {
      return util.sendError(res, 500, 'Server Error');
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
          return util.sendError(res, 404, 'No bookings found');
        }
        return util.sendSuccess(res, 200, [...user.rows]);
      }
      user = await Bookings.getAllBookings();
      return util.sendSuccess(res, 200, [...user.rows]);
    } catch (error) {
      return util.sendError(res, 500, 'Server Error');
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
        return util.sendError(res, 404, 'Booking not found');
      }
      return util.sendSuccess(res, 200, { message: 'Booking cancelled successfully' });
    } catch (error) {
      return util.sendError(res, 500, 'Server Error');
    }
  }
}
export default BookingController;
