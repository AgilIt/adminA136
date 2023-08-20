module.exports = (sequelize, Sequelize) => {
  const Article = sequelize.define('article', {
    iduser: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false
    },
    titre: {
      type: Sequelize.STRING(250),
      allowNull: false
    },
    contenu: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    image: {
      type: Sequelize.BLOB('medium'),
      allowNull: true
    },
    actif: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, 
  {
  timestamps: false, // Exclut les colonnes createdAt et updatedAt
  tableName: 'article', // Définit le nom de la table
  }
  );

  return Article;
};
