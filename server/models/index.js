import 'dotenv/config';
import '@babel/polyfill/noConflict';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === 'test'
      ? process.env.DATABASE_TEST_URL
      : process.env.DATABASE_PROD_URL
});

export default {
  /**
   * DB Query
   * @param {string} text
   * @param {object} params
   * @returns {promise} object
   */
  query(text, params) {
    return new Promise((resolve, reject) => {
      pool
        .query(text, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};
