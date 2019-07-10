/* eslint-disable no-shadow */
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
        trip_id: id, bus_id, origin, destination, trip_date: formattedDate, fare
      });
      return util.send(res);
    } catch (error) {
      if (error.code === '23503') {
        util.setError(404, 'Bus not found');
        return util.send(res);
      }
      util.setError(500, 'Server Error');
      return util.send(res);
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
        result = await Trips.getFilteredTrips(origin);
        if (result.rowCount < 1) {
          util.setError(404, 'Trip not found');
          return util.send(res);
        }
        const formatRows = result.rows.map(({
          // eslint-disable-next-line camelcase
          id, bus_id, origin, destination, trip_date, fare
        }) => {
          return ({
            trip_id: id,
            bus_id,
            origin,
            destination,
            trip_date: moment(trip_date).format('DD-MM-YYYY'),
            fare
          });
        });
        util.setSuccess(200, [...formatRows]);
        return util.send(res);
      }
      if (typeof destination !== 'undefined') {
        result = await Trips.getFilteredTrips(destination);
        if (result.rowCount < 1) {
          util.setError(404, 'Trip not found');
          return util.send(res);
        }
        const formatRows = result.rows.map(({
          // eslint-disable-next-line camelcase
          id, bus_id, origin, destination, trip_date, fare
        }) => {
          return ({
            trip_id: id,
            bus_id,
            origin,
            destination,
            trip_date: moment(trip_date).format('DD-MM-YYYY'),
            fare
          });
        });
        util.setSuccess(200, [...formatRows]);
        return util.send(res);
      }
      result = await Trips.getTrips();
      if (result.rowCount < 1) {
        util.setError(404, 'Trip not found');
        return util.send(res);
      }
      const formatRows = result.rows.map(({
        // eslint-disable-next-line camelcase
        id, bus_id, origin, destination, trip_date, fare
      }) => {
        return ({
          trip_id: id,
          bus_id,
          origin,
          destination,
          trip_date: moment(trip_date).format('DD-MM-YYYY'),
          fare
        });
      });
      util.setSuccess(200, [...formatRows]);
      return util.send(res);
    } catch (error) {
      util.setError(500, 'Server Error');
      return util.send(res);
    }
  }

  /**
   * @method Cancel Trip
   * @description Method to cancel trip
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} Camcel trip message
   */
  static async cancelTrip(req, res) {
    try {
      const tripId = parseInt(req.params.tripId, 10);
      const result = await Trips.cancelTrip(tripId);
      if (result.rowCount < 1) {
        util.setError(404, 'Trip not found');
        return util.send(res);
      }
      util.setSuccess(200, { message: 'Trip cancelled successfully' });
      return util.send(res);
    } catch (error) {
      util.setError(500, 'Server Error');
      return util.send(res);
    }
  }
}
export default TripController;
