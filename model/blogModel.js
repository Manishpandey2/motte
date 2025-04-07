module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define(
    "Blog",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      excerpt: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      categories: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tags: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      metaDescription: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true, // Enable timestamps (createdAt and updatedAt)
    }
  );
  return Blog;
};
