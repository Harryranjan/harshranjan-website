const { sequelize } = require("../config/database");
const { DataTypes } = require("sequelize");

// Import models
const BlogPost = require("./BlogPost");
const User = require("./User");
const Category = require("./Category")(sequelize, DataTypes);
const Tag = require("./Tag")(sequelize, DataTypes);
const Download = require("./Download");
const DownloadLead = require("./DownloadLead");
const Menu = require("./Menu");
const MenuItem = require("./MenuItem");
const Page = require("./Page");
const Form = require("./Form");
const FormSubmission = require("./FormSubmission");
const CTABanner = require("./CTABanner");
const Modal = require("./Modal");
const Popup = require("./Popup");

// Define associations
Download.hasMany(DownloadLead, {
  foreignKey: "download_id",
  as: "leads",
});

DownloadLead.belongsTo(Download, {
  foreignKey: "download_id",
  as: "download",
});

// Menu associations
Menu.hasMany(MenuItem, {
  foreignKey: "menu_id",
  as: "items",
});

MenuItem.belongsTo(Menu, {
  foreignKey: "menu_id",
  as: "menu",
});

// MenuItem self-referencing (parent-child)
MenuItem.hasMany(MenuItem, {
  foreignKey: "parent_id",
  as: "children",
});

MenuItem.belongsTo(MenuItem, {
  foreignKey: "parent_id",
  as: "parent",
});

// MenuItem to Page association
MenuItem.belongsTo(Page, {
  foreignKey: "page_id",
  as: "page",
});

Page.hasMany(MenuItem, {
  foreignKey: "page_id",
  as: "menuItems",
});

// Form associations
Form.hasMany(FormSubmission, {
  foreignKey: "form_id",
  as: "submissions",
});

FormSubmission.belongsTo(Form, {
  foreignKey: "form_id",
  as: "Form",
});

// Export all models
module.exports = {
  sequelize,
  BlogPost,
  User,
  Category,
  Tag,
  Download,
  DownloadLead,
  Menu,
  MenuItem,
  Page,
  Form,
  FormSubmission,
  CTABanner,
  Modal,
  Popup,
};
