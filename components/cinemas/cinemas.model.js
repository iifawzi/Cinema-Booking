const Sequelize = require("sequelize");
const { db } = require("../../startup/db");

const cinemas = db.define("cinemas", {
  cinema_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cinema_name: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  username: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  country: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  city: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  latitude : {
    type:Sequelize.DECIMAL,
    allowNull: false,
},
longitude : {
    type:Sequelize.DECIMAL,
    allowNull: false,
},
cinema_status : {
  type:Sequelize.TEXT,
  allowNull: false,
},
last_checkout : {
  type:Sequelize.DATE,
  allowNull: false,
},
});

module.exports = {
  cinemasModel: cinemas,
};
