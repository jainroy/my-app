const express = require("express");
const Menu = require("../models/Menu");
const router = express.Router();

// Get all menus
router.get("/", async (req, res) => {
  try {
    const menus = await Menu.find();
    res.json(menus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new menu
router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;
    const newMenu = new Menu({ name, description, items: [] });
    await newMenu.save();
    res.status(201).json(newMenu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add an item to a menu
router.post("/:id/items", async (req, res) => {
  try {
    const { id } = req.params; // Menu ID
    const { name, description, price } = req.body; // Item details

    const menu = await Menu.findById(id);
    if (!menu) return res.status(404).json({ message: "Menu not found" });

    // Add the new item to the menu's items array
    menu.items.push({ name, description, price });
    await menu.save();

    res.status(201).json(menu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Get a specific menu with items
router.get("/:id", async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) return res.status(404).json({ message: "Menu not found" });
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
