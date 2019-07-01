import Users from '../models/Users';
import helper from '../helpers/Helper';
import util from '../helpers/Util';

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
      const { id, isadmin, } = rows[0];
      const token = helper.generateToken({ id, isadmin });
      util.setSuccess(201, { id, isadmin, token });
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
