import Users from '../models/Users';
import helper from '../helpers/Helper';
import util from '../helpers/Util';
import exists from '../helpers/dbHelper';

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
      const response = await exists.emailExist(req.body.email);
      if (response.rowCount > 0) {
        return util.sendError(res, 409, 'Email exists');
      }
      const { rows } = await Users.signUp(req.body);
      // eslint-disable-next-line camelcase
      const { id, is_admin, } = rows[0];
      const token = helper.generateToken({ user_id: id, is_admin });
      return util.sendSuccess(res, 201, { user_id: id, is_admin, token });
    } catch (error) {
      return util.sendError(res, 500, 'Server Error');
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
      return util.sendError(401, 'Email or password is incorrect');
    }
    const token = helper.generateToken({ user_id: user.id, is_admin: user.is_admin });
    return util.sendSuccess(res, 200, { user_id: user.id, is_admin: user.is_admin, token });
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
      const response = await exists.emailExist(req.body.email);
      if (response.rowCount > 0) {
        return util.sendError(res, 409, 'Email exists');
      }
      const { rows } = await Users.createAdmin(req.body);
      // eslint-disable-next-line camelcase
      const { id, is_admin, } = rows[0];
      return util.sendSuccess(res, 201, { user_id: id, is_admin });
    } catch (error) {
      return util.sendError(res, 500, 'Server Error');
    }
  }
}
export default UserController;
