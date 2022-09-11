import dotenv from 'dotenv';
import { Pool } from 'pg';
dotenv.config();
const { hosts, db, users, passwords } = process.env;
const client = new Pool({
  host: hosts,
  database: db,
  user: users,
  port: 5432,
  password: passwords,
});
console.log(client.query('SELECT * FROM user4'));
export default client;
