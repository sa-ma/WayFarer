/* eslint-disable quotes */
export default {
  signUp: `INSERT INTO users (email,first_name,last_name,password) VALUES ($1, $2, $3, $4) RETURNING id, is_admin;`,
  createAdmin: `INSERT INTO users (email,first_name,last_name,password, is_admin) VALUES ($1, $2, $3, $4, $5) RETURNING id, is_admin;`,
  createTrip: `INSERT INTO trip (bus_id,origin,destination,trip_date, fare) VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
  getTrips: `SELECT * from trip`
};
