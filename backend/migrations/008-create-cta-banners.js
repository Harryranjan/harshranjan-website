const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable("cta_banners", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Internal name for identification",
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Schedule Your Free ROI Audit",
      },
      description: {
        type: DataTypes.TEXT,
        defaultValue:
          "Discover exactly why top brands trust us with ₹300+ Crores in ad spends",
      },
      variant: {
        type: DataTypes.ENUM(
          "sticky-top",
          "floating-button",
          "slide-bottom",
          "smart-header",
          "banner-strip",
          "corner-popup",
          "full-screen-takeover",
          "slide-in-left",
          "sticky-bottom",
          "notification-bar",
          "slide-in-right",
          "expanding-bar",
          "ribbon-corner",
          "floating-card",
          "side-tab",
          "bottom-drawer",
          "vertical-left",
          "vertical-right"
        ),
        defaultValue: "sticky-top",
      },
      button_text: {
        type: DataTypes.STRING,
        defaultValue: "Get ROI Audit",
      },
      button_url: {
        type: DataTypes.STRING,
        comment:
          "URL to navigate on button click, leave empty for default action",
      },
      phone_number: {
        type: DataTypes.STRING,
        defaultValue: "+919176402555",
      },
      show_phone: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      show_after_scroll: {
        type: DataTypes.INTEGER,
        defaultValue: 100,
        comment:
          "Pixels to scroll before showing (for scroll-triggered variants)",
      },
      dismissible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      colors: {
        type: DataTypes.TEXT,
        comment: "JSON object for custom colors",
        get() {
          const rawValue = this.getDataValue("colors");
          return rawValue
            ? JSON.parse(rawValue)
            : {
                background: "from-red-500 to-red-600",
                buttonBg: "white",
                buttonText: "red-600",
                text: "white",
              };
        },
        set(value) {
          this.setDataValue("colors", JSON.stringify(value));
        },
      },
      settings: {
        type: DataTypes.TEXT("long"),
        comment: "Additional settings as JSON",
        get() {
          const rawValue = this.getDataValue("settings");
          return rawValue ? JSON.parse(rawValue) : {};
        },
        set(value) {
          this.setDataValue("settings", JSON.stringify(value));
        },
      },
      status: {
        type: DataTypes.ENUM("active", "inactive", "draft"),
        defaultValue: "draft",
      },
      placement: {
        type: DataTypes.TEXT,
        comment:
          "Where to show: all, homepage, specific-pages, etc. (JSON array)",
        get() {
          const rawValue = this.getDataValue("placement");
          return rawValue ? JSON.parse(rawValue) : ["all"];
        },
        set(value) {
          this.setDataValue("placement", JSON.stringify(value));
        },
      },
      click_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      view_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });

    console.log("✓ CTA Banners table created successfully");
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("cta_banners");
    console.log("✓ CTA Banners table dropped");
  },
};
