/* eslint-disable camelcase */
import db from './index';
import queries from './migrations/queries';

const {
  createTrip, getTrips, getTripStatus, updateTripStatus, getFilteredTrip
} = queries;

/**
 * @class Trips
 * @description contains method to handle create trips and get trips
 * @exports Trips
 */
class Trips {
  /**
   * @param  {object} data - input fields
   * @method createTrip
   * @returns {object} new trip
   */
  static async createTrip(data) {
    const {
      bus_id, origin, destination, trip_date, fare
    } = data;
    const values = [bus_id, origin, destination, trip_date, fare];
    const response = await db.query(createTrip, values);
    return response;
  }

  /**
   * @method getTrip
   * @returns {object} All trips
   */
  static async getTrips() {
    const response = await db.query(getTrips);
    return response;
  }

  /**
   * @param  {integer} id - trip id
   * @method get trip id
   * @returns {object} trip status
   */
  static async getTripStatus(id) {
    const response = await db.query(getTripStatus, [id]);
    return response;
  }

  /**
   * @param  {integer} id - trip id
   * @method get trip id
   * @returns {object} trip object
   */
  static async cancelTrip(id) {
    const response = await db.query(updateTripStatus, [id]);
    return response;
  }

  /**
   * @param  {string} data - trip Origin or Destination
   * @method get filtered trips
   * @returns {object} trip object
   */
  static async getFilteredTrips(data) {
    const response = await db.query(getFilteredTrip, [data]);
    return response;
  }
}
export default Trips;
