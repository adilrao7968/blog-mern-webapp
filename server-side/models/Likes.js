const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define("Likes", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: sequelize.UUIDV4,
    },
    likedBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.STRING,
      defaultValue: moment().format('ll'),
    },
  }, {timestamps: false});
    
  return Likes;
};
