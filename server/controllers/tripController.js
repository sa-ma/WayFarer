import moment from 'moment';
import Trips from '../models/Trips';
import util from '../helpers/Util';

/**
 * @class TripUserController
 * @description Controller for trips
 * @exports TripController
 */
class TripController {
  /**
   * @method Create Trip
   * @description Method to create a trip
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} New Trip information
   */
  static async createTrip(req, res) {
    try {
      const { rows } = await Trips.createTrip(req.body);
      const {
        // eslint-disable-next-line camelcase
        id, bus_id, origin, destination, trip_date, fare
      } = rows[0];
      const formattedDate = moment(trip_date).format('DD-MM-YYYY');
      util.setSuccess(201, {
        id, bus_id, origin, destination, formattedDate, fare
      });
      return util.send(res);
    } catch (error) {
      if (error.code === '23503') {
        util.setError(409, 'Bus not found');
        return util.send(res);
      }
      util.setError(500, 'Server Error');
      return util.send(res);
    }
  }
}
export default TripController;
