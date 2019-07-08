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
}
export default BookingController;
