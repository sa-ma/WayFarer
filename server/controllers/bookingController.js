/* eslint-disable camelcase */
import Bookings from '../models/Bookings';
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
      const { tripId } = req.body;
      const { id } = helper.verifyToken(req.header('x-auth-token'));
      const seatNumber = await helper.assignSeat(tripId);
      await Bookings.createBooking({ tripId, userId: id, seatNumber });
      const { rows } = await Bookings.getBooking({ userId: id, tripId });
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
      const { id, is_admin } = helper.verifyToken(req.header('x-auth-token'));
      let user;
      if (!is_admin) {
        user = await Bookings.getUserBookings({ id });
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
      const { id } = helper.verifyToken(req.header('x-auth-token'));
      const bookingId = parseInt(req.params.bookingId, 10);
      const result = await Bookings.deleteBooking({ bookingId, userId: id });
      if (result.rowCount < 1) {
        util.setError(404, 'Booking not found');
        return util.send(res);
      }
      util.setSuccess(200, 'Booking deleted successfully');
      return util.send(res);
    } catch (error) {
      util.setError(500, 'Server Error');
      return util.send(res);
    }
  }
}
export default BookingController;
