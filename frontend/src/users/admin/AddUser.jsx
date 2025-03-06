import React, { useState } from "react";
import axios from "axios";
import "./css/UserForm.css";
import { useNavigate } from "react-router-dom";

export default function AddUser(){
    let navigate=useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        role: "",
        password: "",
        mobile: "",
        address: "",
        joiningDate: "",
        salary: "",
        shiftTimings: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const token = localStorage.getItem("Authorization");

            const response = await axios.post(
                "http://localhost:5050/user/register",
                formData,
                {
                    headers: { Authorization: token },
                }
            );

            setMessage("User registered successfully!");
            // setFormData({
            //     email: "",
            //     name: "",
            //     role: "",
            //     password: "",
            //     mobile: "",
            //     address: "",
            //     joiningDate: "",
            //     salary: "",
            //     shiftTimings: "",
            // });
            navigate('/users');
        } catch (error) {
            setMessage(error.response?.data?.message || "Error registering user");
        }}

    return(
<div className="edit-user-container">
   
            <form className="user-form" onSubmit={handleSubmit}>
                <h2 className="form-heading">Add New User</h2>
                {message && <p className="error-message">{message}</p>}

                <div className="form-group">
                    <label className="form-label">Email:</label>
                    <input type="email" name="email" className="form-input" value={formData.email} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label className="form-label">Name:</label>
                    <input type="text" name="name" className="form-input" value={formData.name} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label className="form-label">Role:</label>
                    <select name="role" className="form-select" value={formData.role} onChange={handleChange}>
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="cheaf">Cheaf</option>
                        <option value="waiter">Waiter</option>
                        <option value="cashier">Cashier</option>
                        <option value="deliveryPerson">Delivery Person</option>
                        <option value="customer">Customer</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Password:</label>
                    <input type="password" name="password" className="form-input" value={formData.password} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label className="form-label">Mobile:</label>
                    <input type="text" name="mobile" className="form-input" value={formData.mobile} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label className="form-label">Address:</label>
                    <input type="text" name="address" className="form-input" value={formData.address} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label className="form-label">Joining Date:</label>
                    <input type="date" name="joiningDate" className="form-input" value={formData.joiningDate} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label className="form-label">Salary:</label>
                    <input type="number" name="salary" className="form-input" value={formData.salary} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label className="form-label">Shift Timings:</label>
                    <input type="text" name="shiftTimings" className="form-input" value={formData.shiftTimings} onChange={handleChange} />
                </div>

                <button type="submit" className="submit-btn">Register User</button>
            </form>
        </div>
    )
}