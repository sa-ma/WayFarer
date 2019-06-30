import dbQuery from './index';

const dropTables = 'DROP TABLE IF EXISTS users, bus, trip, booking CASCADE';

dbQuery(dropTables);
