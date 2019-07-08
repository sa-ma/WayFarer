import dbQuery from './index';

const createTables = `
CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  password TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT false,
  created_on TIMESTAMP NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS bus
(
  id SERIAL PRIMARY KEY,
  number_plate VARCHAR(100) NOT NULL UNIQUE,
  manufacturer VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  year VARCHAR(100) NOT NULL,
  capacity INTEGER NOT NULL 
);
CREATE TABLE IF NOT EXISTS trip(
  id SERIAL PRIMARY KEY,
  bus_id INTEGER REFERENCES bus(id) ON DELETE CASCADE,
  origin VARCHAR(100) NOT NULL,
  destination VARCHAR(100) NOT NULL,
  trip_date DATE NOT NULL,
  fare NUMERIC(10,2) NOT NULL,
  status VARCHAR(100) DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS booking(
  id SERIAL NOT NULL UNIQUE,
  trip_id INTEGER REFERENCES trip(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, 
  seat_number INTEGER,
  created_on TIMESTAMP NOT NULL DEFAULT now(),
  PRIMARY KEY(trip_id, user_id)
);
`;

dbQuery(createTables);
