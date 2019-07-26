/* eslint-disable camelcase */
/* eslint-disable no-shadow */
import moment from 'moment';
import Trips from '../models/Trips';
import util from '../helpers/Util';
import exists from '../helpers/dbHelper';

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
      const response = await exists.busExist(req.body.bus_id);
      if (response.rowCount <= 0) {
        return util.sendError(res, 404, 'Bus not found');
      }
      const { rows } = await Trips.createTrip(req.body);
      const {
        // eslint-disable-next-line camelcase
        id, bus_id, origin, destination, trip_date, fare
      } = rows[0];
      const formattedDate = moment(trip_date).format('DD-MM-YYYY');
      return util.sendSuccess(res, 201, {
        id, bus_id, origin, destination, trip_date: formattedDate, fare
      });
    } catch (error) {
      return util.sendError(res, 500, 'Server Error');
    }
  }

  /**
   * @method Get All Trips
   * @description Method to get all or filtered trips
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} All Trips
   */
  static async getTrips(req, res) {
    try {
      const { origin, destination } = req.query;
      let result;
      if (typeof origin !== 'undefined') {
        result = await Trips.getFilteredTrips(origin.toLowerCase());
        if (result.rowCount < 1) {
          return util.sendError(res, 404, 'Trip not found');
        }
        return util.sendSuccess(res, 200, [...result.rows]);
      }
      if (typeof destination !== 'undefined') {
        result = await Trips.getFilteredTrips(destination.toLowerCase());
        if (result.rowCount < 1) {
          return util.sendError(res, 404, 'Trip not found');
        }
        return util.sendSuccess(res, 200, [...result.rows]);
      }
      result = await Trips.getTrips();
      if (result.rowCount < 1) {
        return util.sendError(res, 404, 'Trip not found');
      }
      return util.sendSuccess(res, 200, [...result.rows]);
    } catch (error) {
      return util.sendError(res, 500, 'Server Error');
    }
  }

  /**
   * @method Cancel Trip
   * @description Method to cancel trip
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} Cancel trip message
   */
  static async cancelTrip(req, res) {
    try {
      const tripId = parseInt(req.params.trip_id, 10);
      const result = await Trips.cancelTrip(tripId);
      if (result.rowCount < 1) {
        return util.sendError(res, 404, 'Trip not found');
      }
      return util.sendSuccess(res, 200, { message: 'Trip cancelled successfully' });
    } catch (error) {
      return util.sendError(res, 500, 'Server Error');
    }
  }
}
export default TripController;
