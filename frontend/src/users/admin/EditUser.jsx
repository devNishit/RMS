import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './css/EditUser.css'

export default function EditUser() {
  const [user, setUser] = useState({
    name: '',
    role: '',
    mobile: '',
    address: '',
    joiningDate: '',
    salary: '',
    shiftTimings: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5050/user/editUser/${id}`, {headers:{"Authorization":localStorage.getItem("Authorization")} })
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch user data');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5050/user/editUser/${id}`, user , {headers:{"Authorization":localStorage.getItem("Authorization")}} )
      .then((response) => {
        navigate('/users');
      })
      .catch((err) => {
        setError('Failed to update user');
      });
  };

  if (loading) return <p>Loading...</p>;

  return (
    
    <div className="edit-user-container">
      {/* <h2 className="form-heading">Edit User</h2> */}
      {error && <p className="error-message">{error}</p>}
      
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label className="form-label">Name:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Role:</label>
          <select
            name="role"
            value={user.role}
            onChange={handleChange}
            className="form-select"
            required
          >
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
          <label className="form-label">Mobile:</label>
          <input
            type="text"
            name="mobile"
            value={user.mobile}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Address:</label>
          <input
            type="text"
            name="address"
            value={user.address}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Joining Date:</label>
          <input
            type="date"
            name="joiningDate"
            value={user.joiningDate}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Salary:</label>
          <input
            type="number"
            name="salary"
            value={user.salary}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Shift Timings:</label>
          <input
            type="text"
            name="shiftTimings"
            value={user.shiftTimings}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-btn">
          Update User
        </button>
      </form>
    </div>
  );
}
