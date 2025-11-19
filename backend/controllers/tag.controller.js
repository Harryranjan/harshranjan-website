const { Tag } = require("../models");
const { BlogPost } = require("../models");

// Get all tags with usage counts
exports.getAllTags = async (req, res) => {
  try {
    const tags = await Tag.findAll({
      order: [
        ["usage_count", "DESC"],
        ["name", "ASC"],
      ],
    });
    res.json(tags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({ message: "Error fetching tags" });
  }
};

// Get popular tags (top 10)
exports.getPopularTags = async (req, res) => {
  try {
    const tags = await Tag.findAll({
      where: {
        usage_count: { [require("sequelize").Op.gt]: 0 },
      },
      order: [["usage_count", "DESC"]],
      limit: 10,
    });
    res.json(tags);
  } catch (error) {
    console.error("Error fetching popular tags:", error);
    res.status(500).json({ message: "Error fetching popular tags" });
  }
};

// Get single tag
exports.getTagById = async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }
    res.json(tag);
  } catch (error) {
    console.error("Error fetching tag:", error);
    res.status(500).json({ message: "Error fetching tag" });
  }
};

// Create new tag
exports.createTag = async (req, res) => {
  try {
    const { name, slug, description, color } = req.body;

    // Check if slug already exists
    const existingTag = await Tag.findOne({ where: { slug } });
    if (existingTag) {
      return res
        .status(400)
        .json({ message: "A tag with this slug already exists" });
    }

    const tag = await Tag.create({
      name,
      slug,
      description,
      color: color || "#10B981",
      usage_count: 0,
    });

    res.status(201).json(tag);
  } catch (error) {
    console.error("Error creating tag:", error);
    res.status(500).json({ message: "Error creating tag" });
  }
};

// Update tag
exports.updateTag = async (req, res) => {
  try {
    const { name, slug, description, color } = req.body;
    const tag = await Tag.findByPk(req.params.id);

    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }

    // Check if slug is being changed and if it already exists
    if (slug !== tag.slug) {
      const existingTag = await Tag.findOne({ where: { slug } });
      if (existingTag) {
        return res
          .status(400)
          .json({ message: "A tag with this slug already exists" });
      }
    }

    tag.name = name !== undefined ? name : tag.name;
    tag.slug = slug !== undefined ? slug : tag.slug;
    tag.description = description !== undefined ? description : tag.description;
    tag.color = color !== undefined ? color : tag.color;

    await tag.save();
    res.json(tag);
  } catch (error) {
    console.error("Error updating tag:", error);
    res.status(500).json({ message: "Error updating tag" });
  }
};

// Delete tag
exports.deleteTag = async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);

    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }

    await tag.destroy();
    res.json({ message: "Tag deleted successfully" });
  } catch (error) {
    console.error("Error deleting tag:", error);
    res.status(500).json({ message: "Error deleting tag" });
  }
};

// Sync tag usage counts
exports.syncTagCounts = async (req, res) => {
  try {
    const tags = await Tag.findAll();

    for (const tag of tags) {
      const posts = await BlogPost.findAll({
        where: {
          tags: {
            [require("sequelize").Op.like]: `%"${tag.name}"%`,
          },
        },
      });

      tag.usage_count = posts.length;
      await tag.save();
    }

    res.json({ message: "Tag counts synchronized successfully" });
  } catch (error) {
    console.error("Error syncing tag counts:", error);
    res.status(500).json({ message: "Error syncing tag counts" });
  }
};
