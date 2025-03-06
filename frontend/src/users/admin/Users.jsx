import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Dashbord.css'

export default function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5050/user/list');
            setUsers(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5050/user/delete`, {headers:{"Authorization":localStorage.getItem("Authorization")},  data: { id } });
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="users-container">
            <h2 className="users-heading">Users List</h2>
            <button className="add-user-btn" onClick={() => window.location.href='/addUser'}>Add New User</button>
            <table className="users-table" border="1" width="100%">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Number</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Address</th>
                        <th>Salary</th>
                        <th>Joining Date</th>
                        <th>Shift Timings</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user => (
                        <tr key={user._id}>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                            <td>{user.name}</td>
                            <td>{user.role}</td>
                            <td>{user.address}</td>
                            <td>{user.salary}</td>
                            <td>{user.joiningDate}</td>
                            <td>{user.shiftTimings}</td>
                            <td>
                                <button className="edit-btn" onClick={() => window.location.href=`/edit-user/${user._id}`}>Edit</button>
                                <button className="delete-btn" onClick={() => handleDelete(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
