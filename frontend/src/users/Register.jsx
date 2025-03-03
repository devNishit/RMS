import { Link, useNavigate } from 'react-router-dom';
import '../css/Auth.css';
import { useState } from 'react';
import axios from 'axios';

export default function Register(){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', password: '', mobile: '', address: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        try {
            await axios.post('http://localhost:5050/user/customer/register', formData);
            alert('Registration successful!');
            navigate('/login');
        } catch (error) {
            alert(error.response?.data?.message || 'Registration failed');
        }
    };

    return(
        <>
        <form onSubmit={handleSubmit}  className="auth-form">
            <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <input type="text" name="mobile" placeholder="Mobile" onChange={handleChange} />
            <input type="text" name="address" placeholder="Address" onChange={handleChange} />
            <button type="submit">Register</button>
            <p>Already have an account? <Link to="/login">Login here</Link></p>
        </form>
        </>
    )
}