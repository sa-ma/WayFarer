import Users from '../models/Users';
import helper from '../helpers/Helper';
import util from '../helpers/Util';
import exists from '../helpers/EmailExists';

/**
 * @class UserController
 * @description Controller for Users
 * @exports userController
 */
class UserController {
  /**
   * @method Create User
   * @description Method to create a user
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} New User information
   */
  static async signUp(req, res) {
    try {
      const { rows } = await Users.signUp(req.body);
      // eslint-disable-next-line camelcase
      const { id, is_admin, } = rows[0];
      const token = helper.generateToken({ id, is_admin });
      util.setSuccess(201, { user_id: id, is_admin, token });
      return util.send(res);
    } catch (error) {
      if (error.code === '23505') {
        util.setError(409, 'Email already exists');
        return util.send(res);
      }
      util.setError(500, 'Server Error');
      return util.send(res);
    }
  }

  /**
   * @method Sign in User
   * @description Method to sign in a user
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} Signed user information
   */
  static async signIn(req, res) {
    const { email, password } = req.body;
    const response = await exists.emailExist(email);
    const user = { ...response.rows[0] };
    if (response.rowCount < 1 || !helper.verifyPassword(password, user.password)) {
      util.setError(401, 'Email or password is incorrect');
      return util.send(res);
    }
    const token = helper.generateToken({ id: user.id, is_admin: user.is_admin });
    util.setSuccess(200, { user_id: user.id, is_admin: user.is_admin, token });
    return util.send(res);
  }

  /**
   * @method Create Admin
   * @description Method to create an admin
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} New Admin information
   */
  static async createAdmin(req, res) {
    try {
      const { rows } = await Users.createAdmin(req.body);
      // eslint-disable-next-line camelcase
      const { id, is_admin, } = rows[0];
      const token = helper.generateToken({ id, is_admin });
      util.setSuccess(201, { user_id: id, is_admin, token });
      return util.send(res);
    } catch (error) {
      if (error.code === '23505') {
        util.setError(409, 'Email already exists');
        return util.send(res);
      }
      util.setError(500, 'Server Error');
      return util.send(res);
    }
  }
}
export default UserController;
