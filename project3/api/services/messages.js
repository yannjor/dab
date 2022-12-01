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

const getReplies = async (message_id) => {
  const result = await executeQuery(
    "SELECT * FROM replies WHERE message_id = $1;",
    [message_id]
  );
  return result.rows;
};

const createReply = async (message_id, user_id, reply) => {
  const { rows } = await executeQuery(
    "INSERT INTO replies(text, user_id, message_id) VALUES ($1, $2, $3) RETURNING *;",
    [reply, user_id, message_id]
  );
  return rows[0];
};

const messageService = { getAll, getById, create, getReplies, createReply };
module.exports = messageService;
