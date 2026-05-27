// foodController.js
import fs from "fs";
import mongoose from "mongoose";
import foodModel from "../models/foodModel.js";

// Add food item
const addFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image file uploaded" });
    }

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: req.file.filename,
    });

    await food.save();
    res.status(201).json({ success: true, message: "Food Added", data: food });
  } catch (error) {
    console.error("Error adding food:", error);
    res.status(500).json({ success: false, message: "Error adding food" });
  }
};

// List all food items
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.error("Error fetching foods:", error);
    res.status(500).json({ success: false, message: "Error fetching foods" });
  }
};

// Remove food item (accept ID from JSON body)
const removeFood = async (req, res) => {
  try {
    const { id } = req.body; // ID from request body

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    // Find food by ID
    const food = await foodModel.findById(id);
    if (!food) {
      return res.status(404).json({ success: false, message: "Food not found" });
    }

    // Delete associated image if exists
    if (food.image) {
      try {
        await fs.promises.unlink(`uploads/${food.image}`);
      } catch (err) {
        console.error("Error deleting image:", err);
      }
    }

    // Delete the food document
    await foodModel.findByIdAndDelete(id);

    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.error("Error removing food:", error);
    res.status(500).json({ success: false, message: "Error removing food" });
  }
};

export { addFood, listFood, removeFood };
