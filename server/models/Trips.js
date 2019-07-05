import db from './index';
import queries from './migrations/queries';

const { createTrip } = queries;

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
}
export default Trips;
