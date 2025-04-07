const dbCongfig = require("../config/dbConfig.js");

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
  dbCongfig.DB,
  dbCongfig.USER,
  dbCongfig.PASSWORD,
  {
    host: dbCongfig.HOST,
    dialect: dbCongfig.dialect,
    operatorsAliases: false,
    pool: {
      max: dbCongfig.pool.max,
      min: dbCongfig.pool.min,
      acquire: dbCongfig.pool.acquire,
      idle: dbCongfig.pool.idle,
    },
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.contact = require("./contactModel.js")(sequelize, DataTypes);
db.blog = require("./blogModel.js")(sequelize, DataTypes);

sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = { db, sequelize };
