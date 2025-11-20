const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface) => {
    // Create menus table
    await queryInterface.createTable("menus", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: "header, footer, sidebar, mobile, custom",
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      settings: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "JSON settings for menu appearance, mobile behavior, etc",
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });

    // Create menu_items table
    await queryInterface.createTable("menu_items", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      menu_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "menus",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      parent_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "menu_items",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: "custom",
        comment: "page, post, category, custom, mega, dropdown",
      },
      target: {
        type: DataTypes.STRING(10),
        defaultValue: "_self",
        comment: "_self, _blank",
      },
      icon: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      badge: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      css_class: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      order: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      visibility: {
        type: DataTypes.STRING(20),
        defaultValue: "both",
        comment: "desktop, mobile, both",
      },
      page_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "pages",
          key: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },
      mega_menu_settings: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "JSON settings for mega menu columns, layout, etc",
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });

    // Add indexes for better performance
    await queryInterface.addIndex("menus", ["location"]);
    await queryInterface.addIndex("menus", ["is_active"]);
    await queryInterface.addIndex("menu_items", ["menu_id"]);
    await queryInterface.addIndex("menu_items", ["parent_id"]);
    await queryInterface.addIndex("menu_items", ["order"]);
    await queryInterface.addIndex("menu_items", ["page_id"]);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("menu_items");
    await queryInterface.dropTable("menus");
  },
};
