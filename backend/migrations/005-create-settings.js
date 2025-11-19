module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("settings", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      key: {
        type: Sequelize.STRING(100),
        unique: true,
        allowNull: false,
      },
      value: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      type: {
        type: Sequelize.ENUM(
          "string",
          "number",
          "boolean",
          "json",
          "encrypted"
        ),
        defaultValue: "string",
      },
      category: {
        type: Sequelize.STRING(50),
        defaultValue: "general",
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });

    // Insert default email settings (ignore if already exists)
    const settingsData = [
      {
        key: "email_provider",
        value: "gmail",
        type: "string",
        category: "email",
        description:
          "Email service provider (gmail, zoho, hostinger, godaddy, custom)",
      },
      {
        key: "email_host",
        value: "smtp.gmail.com",
        type: "string",
        category: "email",
        description: "SMTP host server",
      },
      {
        key: "email_port",
        value: "587",
        type: "number",
        category: "email",
        description: "SMTP port",
      },
      {
        key: "email_secure",
        value: "false",
        type: "boolean",
        category: "email",
        description: "Use SSL/TLS",
      },
      {
        key: "email_user",
        value: "",
        type: "string",
        category: "email",
        description: "SMTP username/email",
      },
      {
        key: "email_password",
        value: "",
        type: "encrypted",
        category: "email",
        description: "SMTP password",
      },
      {
        key: "email_from",
        value: "noreply@harshranjan.com",
        type: "string",
        category: "email",
        description: "From email address",
      },
      {
        key: "admin_email",
        value: "admin@harshranjan.com",
        type: "string",
        category: "email",
        description: "Admin notification email",
      },
      {
        key: "email_enabled",
        value: "true",
        type: "boolean",
        category: "email",
        description: "Enable email notifications globally",
      },
    ];

    // Insert each setting individually, ignoring duplicates
    for (const setting of settingsData) {
      try {
        await queryInterface.bulkInsert("settings", [setting]);
      } catch (err) {
        // Ignore duplicate key errors
        if (err.name !== "SequelizeUniqueConstraintError") {
          throw err;
        }
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("settings");
  },
};
