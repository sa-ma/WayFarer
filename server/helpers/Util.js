/**
 * @class Util
 * @description Contains responses for running and testing api endpoints
 * @export Util
 */
class Util {
  constructor() {
    this.statusCode = null;
    this.type = null;
    this.data = null;
    this.error = null;
  }

  /**
   * @method setSuccess
   * @description Helps to set success response for api endpoints
   * @param  {number} statusCode - HTTP success status code
   * @param  {string} message - success message
   * @param  {object} data - JSON object containing result
   */
  static setSuccess(statusCode, data) {
    this.statusCode = statusCode;
    this.type = 'success';
    this.data = data;
  }

  /**
   * @method setError
   * @description Helps to set error response for api endpoints
   * @param  {number} statusCode - HTTP failure status code
   * @param  {string} message - failure message
   */
  static setError(statusCode, error) {
    this.statusCode = statusCode;
    this.type = 'error';
    this.error = error;
  }

  /**
   * @method send
   * @description Helps to set success response for api endpoints
   * @param   {object} res - Express response object
   * @returns {object} res - object containing result
   */
  static send(res) {
    if (this.type === 'success') {
      res.status(this.statusCode).json({
        status: this.type,
        data: this.data
      });
      // eslint-disable-next-line no-else-return
    } else {
      res.status(this.statusCode).json({
        status: this.type,
        error: this.error
      });
    }
  }
}
export default Util;
