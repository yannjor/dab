const executeQuery = require("../database/database");

const getAll = async () => {
  const result = await executeQuery("SELECT * FROM exercises;");
  return result.rows;
};

const getById = async (id) => {
  const { rows } = await executeQuery(
    "SELECT * FROM exercises WHERE id = $1;",
    [id]
  );
  if (rows.length) {
    return rows[0];
  } else {
    return { error: `Exercise with id ${id} not found` };
  }
};

module.exports = { getAll, getById };
