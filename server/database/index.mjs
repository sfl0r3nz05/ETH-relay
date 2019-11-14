import pg from "pg";

const { Client } = pg;

const config = {
  user: 'postgres',
  database: 'addressdb',
  password: 'Ceit_1234',
  host: '193.145.250.217',
  port: 5432,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
}

export default new Client(config);