const executeQuery = require("../database/database");

const create = async (user_id, exercise_id, completed) => {
  await executeQuery(
    "INSERT INTO submissions(user_id, exercise_id, completed) VALUES ($1, $2, $3);",
    [user_id, exercise_id, completed]
  );
};

const getAll = async () => {
  const result = await executeQuery("SELECT * FROM submissions;");
  return result.rows;
};

const getById = async (id) => {
  const { rows } = await executeQuery(
    "SELECT * FROM submissions WHERE id = $1;",
    [id]
  );
  return rows;
};

const submissionService = { create, getAll, getById };
module.exports = submissionService;
