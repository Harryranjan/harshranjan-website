module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("cta_banners", "form_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "forms",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("cta_banners", "form_id");
  },
};
