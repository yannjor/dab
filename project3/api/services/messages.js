const executeQuery = require("../database/database");

const getAll = async () => {
  const result = await executeQuery("SELECT * FROM messages;");
  return result.rows;
};

const getById = async (id) => {
  const { rows } = await executeQuery("SELECT * FROM messages WHERE id = $1;", [
    id,
  ]);
  if (rows.length) {
    return rows[0];
  } else {
    return { error: `Message with id ${id} not found` };
  }
};

const create = async (text, user_id) => {
  const { rows } = await executeQuery(
    "INSERT INTO messages(text, user_id) VALUES ($1, $2) RETURNING *;",
    [text, user_id]
  );
  return rows[0];
};

const messageService = { getAll, getById, create };
module.exports = messageService;
