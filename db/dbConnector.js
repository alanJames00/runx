const { Pool } = require("pg");

// setup the pool
const pool = new Pool({

  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

// create and export the the query builder ane executer
module.exports = async (text, params) => {
  // create a client from pool
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  }
  catch(e) {
    console.log(e);
  }
}
