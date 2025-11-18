const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const BlogPost = sequelize.define(
  "BlogPost",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(191),
      allowNull: false,
      unique: true,
    },
    excerpt: {
      type: DataTypes.TEXT,
    },
    content: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    featured_image: {
      type: DataTypes.STRING(500),
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(100),
    },
    tags: {
      type: DataTypes.TEXT,
      get() {
        const rawValue = this.getDataValue('tags');
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value) {
        this.setDataValue('tags', JSON.stringify(value || []));
      },
    },
    reading_time: {
      type: DataTypes.INTEGER,
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    is_published: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    published_at: {
      type: DataTypes.DATE,
    },
    meta_title: {
      type: DataTypes.STRING(255),
    },
    meta_description: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "blog_posts",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = BlogPost;
