import postgres from 'postgres';

const sql = postgres({
  host: 'localhost',
  port: 5432,
  database: 'worthy-dev-db',
  username: 'admin',
  password: 'admin',
});

export default sql;
