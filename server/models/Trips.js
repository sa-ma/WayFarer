import db from './index';
import queries from './migrations/queries';

const { createTrip, getTrips } = queries;

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
}
export default Trips;
