const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const Profiles = sequelize.define("Profiles", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: sequelize.UUIDV4,
    },
    profession: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summery: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    twitter: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue:"https://twitter.com"
    },
    facebook: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue:"https://facebook.com"
    },
    linkedIn: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue:"https://linkedin.com"
    },
    slack: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue:"https://slack.com"
    }
  }, {timestamps: false});

  return Profiles;
};