import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import '../css/Auth.css';

export default function Login(){
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(credentials);
            const response = await axios.post('http://localhost:5050/user/login', credentials);
            localStorage.setItem('Authorization', response.data.token);
            alert('Login successful!');
            navigate('/');
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || 'Login failed');
        }
    };

    return(
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>Login</h2>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Login</button>
                <p>Forgot Password? <Link to="/reset-pass">Reset here</Link></p>
                <p>Don't have an account? <Link to="/register">Register here</Link></p>
            </form>
        </div>
    )
}