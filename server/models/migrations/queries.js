/* eslint-disable quotes */
export default {
  signUp: `INSERT INTO users (email,first_name,last_name,password) VALUES ($1, $2, $3, $4) RETURNING id, is_admin;`,
  createAdmin: `INSERT INTO users (email,first_name,last_name,password, is_admin) VALUES ($1, $2, $3, $4, $5) RETURNING id, is_admin;`,
  createTrip: `INSERT INTO trip (bus_id,origin,destination,trip_date, fare) VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
  getTrips: `SELECT * from trip;`,
  createBooking: `INSERT INTO booking (trip_id, user_id, seat_number) VALUES ($1, $2, $3) RETURNING *;`,
  getCurrentBooking: `SELECT b.id as booking_id, u.id as user_id, t.id as trip_id, bu.id as bus_id, trip_date, seat_number, first_name, last_name, 
  email from booking b inner join users u on u.id = b.user_id inner join trip t on t.id= b.trip_id inner join bus bu on bu.id = t.bus_id 
  where t.id = $1 and u.id = $2;`,
  getSeatCapacity: `Select capacity from bus where id = $1; RETURNING *;`
};
