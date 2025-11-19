const { sequelize } = require("../config/database");
const { DataTypes } = require("sequelize");

// Import models
const BlogPost = require("./BlogPost");
const User = require("./User");
const Category = require("./Category")(sequelize, DataTypes);
const Tag = require("./Tag")(sequelize, DataTypes);

// Export all models
module.exports = {
  sequelize,
  BlogPost,
  User,
  Category,
  Tag,
};
