module.exports = (sequelize, DataTypes) => {
  const Views = sequelize.define("Views", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: sequelize.UUIDV4,
    },
    viewedBy: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {timestamps: false});
    
  return Views;
};
