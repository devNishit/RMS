import React, { useState } from "react";
import axios from "axios";
import "./MenuStyles.css";
import {useNavigate} from 'react-router-dom';

export default function AddMenuItem() {

    const navigate=useNavigate();
    const [form, setForm] = useState({
        item: "",
        ingredients: "",
        keyword: "",
        price: "",
        category: "",
        image: null
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setForm({ ...form, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(""); // Clear previous messages
        const formData = new FormData();
        Object.keys(form).forEach((key) => formData.append(key, form[key]));

        try {
            const headers = { Authorization: localStorage.getItem("Authorization") };
            const response = await axios.post("http://localhost:5050/menu/add", formData, { headers });

            setMessage("Menu item added successfully!");
            navigate('/manu');
        } catch (error) {
            setMessage(error.response?.data?.message || "Error adding menu item");
        }
    };

    return (
        <div className="menu-container">
            <form className="menu-form" onSubmit={handleSubmit} encType="multipart/form-data">
                <h2>Add Menu Item</h2>
                {message && <p className="form-message">{message}</p>}

                <div className="form-group">
                    <label htmlFor="item">Item Name:</label>
                    <input type="text" id="item" name="item" placeholder="Enter item name" value={form.item} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="ingredients">Ingredients:</label>
                    <input type="text" id="ingredients" name="ingredients" placeholder="Enter ingredients" value={form.ingredients} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="keyword">Keywords:</label>
                    <input type="text" id="keyword" name="keyword" placeholder="Enter keywords" value={form.keyword} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <select id="category" name="category" className="form-select" value={form.category} onChange={handleChange} required>
                        <option value="">Select Category</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input type="number" id="price" name="price" placeholder="Enter price" value={form.price} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="image">Upload Image:</label>
                    <input type="file" id="image" name="image" onChange={handleFileChange} accept="image/*" required />
                </div>

                <button type="submit">Add Item</button>
            </form>
        </div>
    );
}
