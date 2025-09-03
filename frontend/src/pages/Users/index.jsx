import React, { useEffect, useState } from 'react';
import API from '../../helpers/api';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [editingId, setEditingId] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/users', { name, email });
        } catch (error) {
            console.error('Error saving grant:', error);
        }
    };

    return (
        <div>
            <h3>Users</h3>
            <form className="mb-4">
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    className="form-control mb-2"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button className="btn btn-primary">
                    {editingId ? 'Update' : 'Add'} User
                </button>
            </form>

            <table className="table">
                <thead><tr><th>Name</th><th>Email</th><th>Actions</th></tr></thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button className="btn btn-sm btn-warning mr-2">Edit</button>
                                <button className="btn btn-sm btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <p>Username: {name}</p>
            <p>UserEmail: {email}</p>

        </div>
    );
}

export default Users;