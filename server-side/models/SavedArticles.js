const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const SavedArticles = sequelize.define("SavedArticles", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: sequelize.UUIDV4,
    },
    savedBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    savedArticleId: {
      type: DataTypes.STRING,
      allowNull: false,
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
    createdAt: {
      type: DataTypes.STRING,
      defaultValue: moment().format('ll'),
    },
  }, {timestamps: false});

   SavedArticles.associate = (models) => {
    SavedArticles.belongsToMany(models.Users, { through: 'UserSavedArticles' }, {
      onDelete: "cascade"
    })
  }
    
  return SavedArticles;
};
