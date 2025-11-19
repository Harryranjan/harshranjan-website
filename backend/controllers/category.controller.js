const { Category } = require("../models");

// Get all categories with post counts
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      order: [["name", "ASC"]],
    });
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Error fetching categories" });
  }
};

// Get single category
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ message: "Error fetching category" });
  }
};

// Create new category
exports.createCategory = async (req, res) => {
  try {
    const { name, slug, description, color } = req.body;

    // Check if slug already exists
    const existingCategory = await Category.findOne({ where: { slug } });
    if (existingCategory) {
      return res
        .status(400)
        .json({ message: "A category with this slug already exists" });
    }

    const category = await Category.create({
      name,
      slug,
      description,
      color: color || "#3B82F6",
    });

    res.status(201).json(category);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ message: "Error creating category" });
  }
};

// Update category
exports.updateCategory = async (req, res) => {
  try {
    const { name, slug, description, color } = req.body;
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Check if slug is being changed and if it already exists
    if (slug !== category.slug) {
      const existingCategory = await Category.findOne({ where: { slug } });
      if (existingCategory) {
        return res
          .status(400)
          .json({ message: "A category with this slug already exists" });
      }
    }

    category.name = name !== undefined ? name : category.name;
    category.slug = slug !== undefined ? slug : category.slug;
    category.description =
      description !== undefined ? description : category.description;
    category.color = color !== undefined ? color : category.color;

    await category.save();
    res.json(category);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Error updating category" });
  }
};

// Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Check if category has posts
    const { BlogPost } = require("../models");
    const postsCount = await BlogPost.count({
      where: { category: category.name },
    });

    if (postsCount > 0) {
      return res.status(400).json({
        message: `Cannot delete category. ${postsCount} post(s) are using this category.`,
      });
    }

    await category.destroy();
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Error deleting category" });
  }
};
