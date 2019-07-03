/* eslint-disable camelcase */
import helper from '../helpers/Helper';
import util from '../helpers/Util';

/**
 * @class Authenticate
 * @description To user and admin tokens
 * @exports Authenticate
 */
class Authenticate {
  /**
   * @description Verify if user is an Admin
   * @param  {object} req - The user request object
   * @param  {object} res - The user res response object
   * @param  {function} next - The next() Function
   * @returns {object} req.user - The payload object
   */
  static verifyAdmin(req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');
    if (!token) {
      util.setError(401, 'No Token! Authorization Denied');
      util.send(res);
    }
    // Verify token
    try {
      const decoded = helper.verifyToken(token);
      const { is_admin } = decoded;
      req.isAdmin = is_admin;
      if (!req.isAdmin) {
        util.setError(401, 'Not Authorized to view this route');
        return util.send(res);
      }
      return next();
    } catch (error) {
      util.setError(500, 'Server Error');
      return util.send(res);
    }
  }
}

export default Authenticate;