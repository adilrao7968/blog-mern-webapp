const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: sequelize.UUIDV4,
    },
    profile: {
      type: DataTypes.STRING,
      defaultValue:"https://via.placeholder.com/150C/O%20https://lacholder.com/",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique:true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
    },
    expireTimeToken: {
      type: DataTypes.DATE,
    },
    createdAt: {
      type: DataTypes.STRING,
      defaultValue: moment().format('ll'),
    },
  }, {timestamps: false});

  Users.associate = (models) => {
    Users.hasMany(models.Posts, {
      onDelete: "cascade"
    })

    Users.hasOne(models.Profiles, {
      onDelete: "cascade"
    })

    Users.belongsToMany(models.SavedArticles, { through: 'UserSavedArticles' }, {
      onDelete: "cascade"
    })
  }

  return Users;
};
