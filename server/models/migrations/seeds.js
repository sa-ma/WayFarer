import dbQuery from './index';
import helper from '../../helpers/Helper';

const seedTables = `
  INSERT INTO users(email, first_name, last_name, password)
  VALUES('sama@aa.aa','Sama', 'Bala', '${helper.hashPassword('12345')}');

  INSERT INTO users(email, first_name, last_name, password, is_admin)
  VALUES('admin@aa.aa','Sama', 'Admin', '${helper.hashPassword('12345')}', true);

  INSERT INTO bus(number_plate, manufacturer, model, year, capacity)
  VALUES('ABCD-1234', 'Toyota', 'Hiace', '2018', '14' ),
  ('ABCD-4567', 'Jet', 'Mover', '2018', '12' );

  INSERT INTO trip(bus_id,origin,destination,trip_date,fare)
  VALUES(1,'Lagos', 'Abuja', '2019-06-20', 8000),
  (2, 'Warri', 'Abuja','2019-06-20', 8000);

  INSERT INTO trip(bus_id,origin,destination,trip_date,fare,status)
  VALUES(1, 'Lagos', 'Jos','2019-06-20', 8000, 'cancelled');

  `;
dbQuery(seedTables);
