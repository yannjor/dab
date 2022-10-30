const { Client } = require("pg");

const executeQuery = async (query, params) => {
  const response = {};
  let client;

  try {
    const client = new Client();
    client.connect();
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
        await client.end();
      } catch (e) {
        console.log("Unable to release database connection.");
        console.log(e);
      }
    }
  }

  return response;
};

module.exports = executeQuery;
