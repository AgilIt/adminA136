module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    username: {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true
    },
    login: {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false
    }
  });

  return User;
};
