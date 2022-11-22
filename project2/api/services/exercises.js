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

const getUserCompleted = async (user_id) => {
  const result = await executeQuery(
    "SELECT exercise_id FROM submissions WHERE user_id = $1;",
    [user_id]
  );
  return [...new Set(result.rows.map(r => r.exercise_id))];
};

const exerciseService = { getAll, getById, getUserCompleted };
module.exports = exerciseService;
