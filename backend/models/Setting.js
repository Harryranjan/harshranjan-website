const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const crypto = require("crypto");

const Setting = sequelize.define(
  "Setting",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    key: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue("value");
        const type = this.getDataValue("type");

        if (!rawValue) return null;

        // Decrypt if encrypted
        if (type === "encrypted" && rawValue) {
          try {
            return this.decrypt(rawValue);
          } catch (err) {
            console.error("Decryption error:", err);
            return null;
          }
        }

        // Parse based on type
        switch (type) {
          case "number":
            return parseFloat(rawValue);
          case "boolean":
            return rawValue === "true" || rawValue === "1";
          case "json":
            try {
              return JSON.parse(rawValue);
            } catch {
              return null;
            }
          default:
            return rawValue;
        }
      },
      set(value) {
        const type = this.getDataValue("type");

        if (value === null || value === undefined) {
          this.setDataValue("value", null);
          return;
        }

        // Encrypt if needed
        if (type === "encrypted") {
          this.setDataValue("value", this.encrypt(value));
          return;
        }

        // Convert based on type
        switch (type) {
          case "json":
            this.setDataValue("value", JSON.stringify(value));
            break;
          case "boolean":
            this.setDataValue("value", value ? "true" : "false");
            break;
          default:
            this.setDataValue("value", String(value));
        }
      },
    },
    type: {
      type: DataTypes.ENUM("string", "number", "boolean", "json", "encrypted"),
      defaultValue: "string",
    },
    category: {
      type: DataTypes.STRING(50),
      defaultValue: "general",
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "settings",
    underscored: true,
    timestamps: true,
  }
);

// Encryption helpers
Setting.prototype.encrypt = function (text) {
  const algorithm = "aes-256-cbc";
  const key = crypto.scryptSync(
    process.env.JWT_SECRET || "default-secret-key",
    "salt",
    32
  );
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
};

Setting.prototype.decrypt = function (text) {
  const algorithm = "aes-256-cbc";
  const key = crypto.scryptSync(
    process.env.JWT_SECRET || "default-secret-key",
    "salt",
    32
  );
  const parts = text.split(":");
  const iv = Buffer.from(parts[0], "hex");
  const encryptedText = parts[1];
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

// Static method to get setting by key
Setting.getSetting = async function (key, defaultValue = null) {
  const setting = await Setting.findOne({ where: { key } });
  return setting ? setting.value : defaultValue;
};

// Static method to set setting
Setting.setSetting = async function (
  key,
  value,
  type = "string",
  category = "general"
) {
  const [setting, created] = await Setting.findOrCreate({
    where: { key },
    defaults: { value, type, category },
  });

  if (!created) {
    setting.value = value;
    await setting.save();
  }

  return setting;
};

// Static method to get all settings by category
Setting.getByCategory = async function (category) {
  const settings = await Setting.findAll({ where: { category } });
  return settings.reduce((acc, setting) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {});
};

module.exports = Setting;
