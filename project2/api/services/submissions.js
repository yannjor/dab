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

const submissionService = { create, getAll };
module.exports = submissionService;
