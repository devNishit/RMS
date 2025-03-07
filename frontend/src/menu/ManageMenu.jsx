import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MenuStyles.css";

const headers = { Authorization: localStorage.getItem("Authorization") };

export default function ManageMenu() {
    const [menuItems, setMenuItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5050/menu/list`).then((res) => setMenuItems(res.data));
    }, []);

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5050/menu/delete/${id}`, { headers });
        setMenuItems(menuItems.filter((item) => item._id !== id));
    };

    return (
        <div className="menu-container">
            <h2 className="menu-heading">Manage Menu</h2>
            <button className="add-item-btn" onClick={() => navigate("/menu/add")}>Add New Item</button>
            
            <table className="menu-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Ingredients</th>
                        <th>Keywords</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Available</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {menuItems.map((item) => (
                        <tr key={item._id}>
                            <td>{item.item}</td>
                            <td><img src={item.image.url} alt={item.item} className="menu-item-image" /></td>
                            <td>{item.ingredients}</td>
                            <td>{item.keyword}</td>
                            <td>{item.category}</td>
                            <td>${item.price}</td>
                            <td>{item.available ? "Yes" : "No"}</td>
                            <td>
                                <button className="edit-btn" onClick={()=> navigate(`/menu/edit/${item._id}`)}>Edit</button>
                                <button className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
