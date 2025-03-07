import { cloudinary } from "../config/clouldenary.js";
import Menu from '../models/menu.js';

// Add Menu Item
export const addMenuItem = async (req, res) => {
        const { item, ingredients, keyword, category, price } = req.body;

        const newItem = new Menu({
            item,
            ingredients,
            keyword: keyword.split(','), // Convert string to array
            category,
            price,
        });

        if (req.file) {
            newItem.image.public_id = req.file.filename;
            newItem.image.url = req.file.path;
        }

        await newItem.save();
        res.status(201).json({ message: 'Menu item added successfully', newItem });
};

// Display a specific menu item for editing
export const getMenuItem = async (req, res) => {
        const { id } = req.params;
        const menuItem = await Menu.findById(id);
        if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });
        res.status(200).json(menuItem);
};

// Edit Menu
export const editMenuItem = async (req, res) => {

        const { id } = req.params;
        const { item, ingredients, keyword, category, price } = req.body;

        const updatedItem = await Menu.findById(id);
        if (!updatedItem) return res.status(404).json({ message: 'Menu item not found' });

        updatedItem.item = item;
        updatedItem.ingredients = ingredients;
        updatedItem.keyword = keyword.split(',');
        updatedItem.category = category;
        updatedItem.price = price;

        if (req.file) {
            // Delete old image from Cloudinary
            if (updatedItem.image.public_id) {
                await cloudinary.uploader.destroy(updatedItem.image.public_id);
            }

            // Set new image
            updatedItem.image.public_id = req.file.filename;
            updatedItem.image.url = req.file.path;
        }

        await updatedItem.save();
        res.status(200).json({ message: 'Menu item updated successfully', updatedItem });
};

// Delete menu
export const deleteMenuItem = async (req, res) => {
        const { id } = req.params;
        const menuItem = await Menu.findById(id);
        if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });

        // Delete image from Cloudinary
        if (menuItem.image.public_id) {
            await cloudinary.uploader.destroy(menuItem.image.public_id);
        }

        await Menu.findByIdAndDelete(id);
        res.status(200).json({ message: 'Menu item deleted successfully' });
};

// Display all menu items
export const getAllMenuItems = async (req, res) => {
        const menuItems = await Menu.find().populate('category');
        res.status(200).json(menuItems);
    } 
