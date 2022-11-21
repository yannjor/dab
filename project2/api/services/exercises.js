const executeQuery = require("../database/database");

const getAll = async () => {
  const result = await executeQuery("SELECT * FROM exercises;");
  return result.rows;
};

module.exports = { getAll };
