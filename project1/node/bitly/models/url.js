const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
    process.env.PGDATABASE,
    process.env.PGUSER,
    process.env.PGPASSWORD,
    {
        host: "localhost",
        dialect: "postgres",
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection to database has been established successfully.");
    })
    .catch((error) => console.error("Unable to connect to the database:", error));

const Url = sequelize.define("Url", {
    original: DataTypes.STRING,
    shortened: DataTypes.STRING,
});

module.exports = Url;
