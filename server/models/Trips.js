import db from './index';
import queries from './migrations/queries';

const {
  createTrip, getTrips, getTripStatus, updateTripStatus
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
      busId, origin, destination, tripDate, fare
    } = data;
    const values = [busId, origin, destination, tripDate, fare];
    const response = await db.query(createTrip, values);
    return response;
  }

  /**
   * @param  {object} data - input fields
   * @method getTrip
   * @returns {object} All trips
   */
  static async getTrips() {
    const response = await db.query(getTrips);
    return response;
  }

  /**
   * @param  {object} id - trip id
   * @method get trip id
   * @returns {object} trip status
   */
  static async getTripStatus(id) {
    const response = await db.query(getTripStatus, [id]);
    return response;
  }

  /**
   * @param  {object} id - trip id
   * @method get trip id
   * @returns {object} trip object
   */
  static async cancelTrip(id) {
    const response = await db.query(updateTripStatus, [id]);
    return response;
  }
}
export default Trips;
