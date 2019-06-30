import 'dotenv/config';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === 'test'
      ? process.env.DATABASE_TEST_URL
      : process.env.DATABASE_PROD_URL
});
pool.on('connect', () => {
  console.log('connected to database');
});

const dbQuery = (query) => {
  pool
    .query(query)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.error(err);
      pool.end();
    });
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

export default dbQuery;
