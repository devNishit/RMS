import React, { useState } from 'react';
import axios from 'axios';
import '../css/Reset.css';

export default function ResetPass(){

    const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5050/user/password/forgot', { email });
      setSuccess('A password reset link has been sent to your email. Please check your inbox.');
      setError('');
    } catch (err) {
      setError(err.response ? err.response.data.message : 'An error occurred. Please try again.');
      setSuccess('');
    }}

    return(
        <div className="reset-password-container">
      {/* <h2 className="reset-password-heading">Reset Your Password</h2> */}

      <form onSubmit={handleSubmit} className="reset-password-form">
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            required
            placeholder="Enter your email"
          />
        </div>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
    )
}