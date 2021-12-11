const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define("Comments", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: sequelize.UUIDV4,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    commentById: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    commentByName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    commentByProfile: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue:"https://images.unsplash.com/photo-1620510625142-b45cbb784397?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=633&q=80"
    },
    createdAt: {
      type: DataTypes.STRING,
      defaultValue: moment().format('ll'),
    },
  }, { timestamps: false });

  return Comments;
};
