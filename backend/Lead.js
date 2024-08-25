const { DataTypes } = require("sequelize");
const sequelize = require("./database");

const Lead = sequelize.define("Lead", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  channelPartnerCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  leadName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contactNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emailID: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  leadSource: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  leadInterest: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  additionalNotes: {
    type: DataTypes.TEXT,
  },
});

module.exports = Lead;
