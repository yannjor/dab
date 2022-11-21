const { Pool } = require("pg");

const pool = new Pool();

const executeQuery = async (query, params) => {
  const response = {};
  let client;

  try {
    client = await pool.connect();
    const result = await client.query(query, params);
    if (result.rows) {
      response.rows = result.rows;
    }
  } catch (error) {
    console.log(error);
    response.error = error;
  } finally {
    if (client) {
      try {
        client.release();
      } catch (e) {
        console.log("Unable to release database connection.");
        console.log(e);
      }
    }
  }

  return response;
};

module.exports = executeQuery;
