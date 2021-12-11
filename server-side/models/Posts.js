const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: sequelize.UUIDV4,
    },
    postImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.STRING,
      defaultValue: moment().format('ll'),
    },
  }, { timestamps: false });
  
  Posts.associate = (models) => {
    Posts.hasMany(models.Likes, {
      onDelete: "cascade"
    })

    Posts.hasMany(models.Comments, {
      onDelete: "cascade"
    })

    Posts.hasMany(models.Views, {
      onDelete: "cascade"
    })
  }

  return Posts;
};
