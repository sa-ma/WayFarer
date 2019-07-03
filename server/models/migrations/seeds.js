import dbQuery from './index';

const seedTables = `
  INSERT INTO users(email, first_name, last_name, password)
  VALUES('sama@aa.aa','Sama', 'Bala', '$2y$10$t1ZYG4Ct8DIjyXheqspKr.vPq8krK6NwroY3iQEfrkYDpdAPYBG3m'),
  ('abel@aa.aa','Abel', 'Bala', '$2y$10$t1ZYG4Ct8DIjyXheqspKr.vPq8krK6NwroY3iQEfrkYDpdAPYBG3m'),
  ('ben@aa.aa','Ben', 'Bala', '$2y$10$t1ZYG4Ct8DIjyXheqspKr.vPq8krK6NwroY3iQEfrkYDpdAPYBG3m');

  INSERT INTO users(email, first_name, last_name, password, is_admin)
  VALUES('admin@aa.aa','Sama', 'Admin', '$2y$10$t1ZYG4Ct8DIjyXheqspKr.vPq8krK6NwroY3iQEfrkYDpdAPYBG3m', true);

  INSERT INTO bus(number_plate, manufacturer, model, year, capacity)
  VALUES('ABCD-1234', 'Toyota', 'Hiace', '2018', '14' ),
  ('ABCD-4567', 'Jet', 'Mover', '2018', '12' );

  INSERT INTO trip(bus_id,origin,destination,trip_date,fare)
  VALUES(1,'Lagos', 'Abuja', '2019-06-20', '8000'),
  (2, 'Warri', 'Abuja','2019-06-20', '8000'),
  (1, 'Lagos', 'Jos','2019-06-20', '8000');

  INSERT INTO booking(trip_id, user_id)
  VALUES(2,1);
  `;
dbQuery(seedTables);
