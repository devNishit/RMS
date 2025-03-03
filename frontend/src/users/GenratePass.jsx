import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/GeratePass.css';

export default function GenratePass(){

    const { id } = useParams(); // Get the user ID from the URL
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Using useNavigate for navigation

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      // Send the new password to the backend API
      const response = await axios.post(`http://localhost:5050/user/password/reset/${id}`, { password });
      
      // If successful, show a success message and redirect or notify the user
      setMessage('Password reset successfully! You will be redirected soon.');
      
      // Optionally, you can redirect after a successful reset
      setTimeout(() => {
        navigate('/login'); // Redirect to login page or another route
      }, 2000);
    } catch (err) {
      setError('Error resetting password. Please try again.');
    }
  };

    return(
        <div className="reset-password-container">
      {/* <h2>Reset Password</h2>  */}
      {error && <div className="error">{error}</div>}
      {message && <div className="success">{message}</div>}
      <form onSubmit={handleResetPassword} className="reset-password-form">
        <div className="input-container">
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit" className="reset-button">Reset Password</button>
      </form>
    </div>
    )
}