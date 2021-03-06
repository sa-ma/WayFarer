/* eslint-disable camelcase */
import db from './index';
import queries from './migrations/queries';
import helpers from '../helpers/Helper';

const { signUp, createAdmin } = queries;

/**
 * @class User
 * @description contains method to handle sign up, sign in
 * @exports User
 */
class User {
  /**
   * @param  {object} data - input fields
   * @method signUp
   * @returns {object} new user
   */
  static async signUp(data) {
    const {
      email, first_name, last_name, password
    } = data;
    const hashPassword = helpers.hashPassword(password);
    const values = [email, first_name, last_name, hashPassword];
    const response = await db.query(signUp, values);
    return response;
  }

  /**
   * @param  {object} data - input fields
   * @method createAdmin
   * @returns {object} new user
   */
  static async createAdmin(data) {
    const {
      email, first_name, last_name, password
    } = data;
    const hashPassword = helpers.hashPassword(password);
    const values = [email, first_name, last_name, hashPassword, true];
    const response = await db.query(createAdmin, values);
    return response;
  }
}
export default User;
