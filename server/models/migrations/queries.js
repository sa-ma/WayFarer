/* eslint-disable quotes */
export default {
  signUp: `INSERT INTO users (email,first_name,last_name,password) VALUES ($1, $2, $3, $4) 
  RETURNING id, is_admin;`,
  createAdmin: `INSERT INTO users (email,first_name,last_name,password, is_admin) 
  VALUES ($1, $2, $3, $4, $5) RETURNING id, is_admin;`,
  createTrip: `INSERT INTO trip (bus_id,origin,destination,trip_date, fare) 
  VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
  getTrips: `SELECT  id as trip_id, bus_id, origin, destination, trip_date,fare FROM trip;`,
  getTripStatus: `SELECT status from trip where id = $1;`,
  getFilteredTrip: `SELECT id as trip_id, bus_id, origin, destination, trip_date,fare from 
  trip where lower(origin) = $1 or lower(destination) = $1;`,
  updateTripStatus: `UPDATE trip set status = 'cancelled' where id = $1 ;`,
  createBooking: `INSERT INTO booking (trip_id, user_id, seat_number) VALUES ($1, $2, $3) 
  RETURNING *;`,
  getCurrentBooking: `SELECT b.id as id, u.id as user_id, t.id as trip_id, bu.id as bus_id, 
  trip_date, seat_number, first_name, last_name, 
  email from booking b inner join users u on u.id = b.user_id inner join trip t on
  t.id= b.trip_id inner join bus bu on bu.id = t.bus_id  where u.id = $1 and t.id = $2;`,
  getUserBookings: `SELECT b.id as booking_id, u.id as user_id, t.id as trip_id, bu.id as bus_id, trip_date, seat_number, first_name, last_name, 
  email from booking b inner join users u on u.id = b.user_id inner join trip t on 
  t.id= b.trip_id inner join bus bu on bu.id = t.bus_id where u.id = $1;`,
  getAllBookings: `SELECT b.id as booking_id, u.id as user_id, t.id as trip_id, bu.id as bus_id, 
  trip_date, seat_number, first_name, last_name, email from booking b inner join users u on 
  u.id = b.user_id inner join trip t on t.id= b.trip_id inner join bus bu on bu.id = t.bus_id`,
  getSeatCapacity: `Select capacity from bus where id = $1; RETURNING *;`,
  getBookingId: `Select id from booking where id = $1`,
  deleteBooking: `Delete from booking where id = $1 and user_id = $2;`,
  checkEmail: `SELECT * FROM users WHERE email=$1;`,
  checkBus: `SELECT * FROM bus where id = $1`,
  checkTrip: `SELECT * FROM trip WHERE id=$1;`,
  checkBooking: `SELECT * from booking where id = $1 and user_id = $2`
};
