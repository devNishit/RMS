import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MenuStyles.css";
import { useNavigate, useParams } from "react-router-dom";

const headers = { Authorization: localStorage.getItem("Authorization") };

export default function EditMenu() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        item: "",
        ingredients: "",
        keyword: "",
        price: "",
        category: "",
        available: "", // Default to true
        image: null
    });

    const [message, setMessage] = useState("");
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5050/menu/edit/${id}`)
            .then((res) => {
                setForm(res.data);
                if (res.data.image) {
                    setPreview(res.data.image.url);
                }
            })
            .catch((err) => setMessage("Error fetching menu item"));
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setForm({ ...form, image: file });

        // Preview selected image
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleAvailabilityChange = (e) => {
        setForm({ ...form, available: e.target.value === "true" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        const formData = new FormData();
        Object.keys(form).forEach((key) => formData.append(key, form[key]));

        try {
            await axios.put(`http://localhost:5050/menu/edit/${id}`, formData, { headers });
            setMessage("Menu item updated successfully!");
            navigate("/menu");
        } catch (error) {
            setMessage(error.response?.data?.message || "Error updating menu item");
        }
    };

    return (
        <div className="menu-container">
            <form className="menu-form" onSubmit={handleSubmit} encType="multipart/form-data">
                <h2>Edit Menu Item</h2>
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
                    <label htmlFor="available">Available:</label>
                    <select id="available" name="available" className="form-select" value={form.available} onChange={handleChange} required>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Current Image:</label>
                    {preview && <img src={preview} alt="Preview" className="menu-item-image" />}
                </div>

                <div className="form-group">
                    <label htmlFor="image">Change Image:</label>
                    <input type="file" id="image" name="image" onChange={handleFileChange} accept="image/*" />
                </div>

                <button type="submit">Update Item</button>
            </form>
        </div>
    );
}
