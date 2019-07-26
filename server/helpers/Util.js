/**
 * @class Util
 * @description Contains responses for running and testing api endpoints
 * @export Util
 */
class Util {
  /**
   * @method setSuccess
   * @description Helps to set success response for api endpoints
   * @param  {number} statusCode - HTTP success status code
   * @param  {string} message - success message
   * @param  {object} data - JSON object containing result
   * @param   {object} res - Express response object
   * @returns {object} res - object containing result
   */
  static sendSuccess(res, statusCode, data) {
    this.statusCode = statusCode;
    this.type = 'success';
    this.data = data;
    return res.status(this.statusCode).json({
      status: this.type,
      data: this.data
    });
  }

  /**
   * @method setError
   * @description Helps to set error response for api endpoints
   * @param  {number} statusCode - HTTP failure status code
   * @param  {string} message - failure message
   * @param   {object} res - Express response object
   * @returns {object} res - object containing result
   */
  static sendError(res, statusCode, error) {
    this.statusCode = statusCode;
    this.type = 'error';
    this.error = error;
    return res.status(this.statusCode).json({
      status: this.type,
      error: this.error
    });
  }
}
export default Util;
