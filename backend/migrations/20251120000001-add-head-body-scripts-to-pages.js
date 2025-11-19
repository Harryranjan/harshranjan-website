"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("pages", "head_scripts", {
      type: Sequelize.TEXT("long"),
      allowNull: true,
      after: "custom_js",
      comment:
        "Scripts to inject in <head> section (Facebook Pixel, GA4, Tag Manager, etc.)",
    });

    await queryInterface.addColumn("pages", "body_scripts", {
      type: Sequelize.TEXT("long"),
      allowNull: true,
      after: "head_scripts",
      comment: "Scripts to inject in <body> section (tracking codes, etc.)",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("pages", "head_scripts");
    await queryInterface.removeColumn("pages", "body_scripts");
  },
};
