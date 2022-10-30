const { nanoid } = require("nanoid");
const executeQuery = require("../database/database");

const create = async (original) => {
  const shortened = nanoid(8);
  await executeQuery(
    "INSERT INTO urls (original, shortened) VALUES ($1, $2);",
    [original, shortened]
  );
  return shortened;
};

const getAll = async () => {
  const result = await executeQuery("SELECT * FROM urls;");
  return result.rows;
};

const getOriginal = async (shortened) => {
  const { rows } = await executeQuery(
    "SELECT original FROM urls WHERE shortened = $1;",
    [shortened]
  );
  return rows[0].original;
};

module.exports = { create, getAll, getOriginal };
