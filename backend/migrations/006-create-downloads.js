const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create downloads table
    await queryInterface.createTable("downloads", {
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
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      short_description: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      category: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: "general",
      },
      thumbnail: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      file_url: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      file_type: {
        type: DataTypes.STRING(50),
        allowNull: true,
        comment: "pdf, docx, zip, etc.",
      },
      file_size: {
        type: DataTypes.STRING(50),
        allowNull: true,
        comment: 'e.g., "2.5 MB"',
      },
      download_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.ENUM("published", "draft", "archived"),
        defaultValue: "draft",
      },
      featured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      meta_title: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      meta_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      requires_form: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        comment: "Whether to show lead capture form before download",
      },
      author_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });

    // Create download_leads table
    await queryInterface.createTable("download_leads", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      download_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "downloads",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      company: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      ip_address: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      user_agent: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      downloaded: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        comment: "Whether the file was actually downloaded",
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // Add indexes for better performance
    await queryInterface.addIndex("downloads", ["slug"]);
    await queryInterface.addIndex("downloads", ["status"]);
    await queryInterface.addIndex("downloads", ["category"]);
    await queryInterface.addIndex("downloads", ["featured"]);
    await queryInterface.addIndex("download_leads", ["download_id"]);
    await queryInterface.addIndex("download_leads", ["email"]);
    await queryInterface.addIndex("download_leads", ["created_at"]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("download_leads");
    await queryInterface.dropTable("downloads");
  },
};
