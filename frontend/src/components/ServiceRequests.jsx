import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig'; // Adjust the import path if necessary

const ServiceRequests = () => {
    const [requests, setRequests] = useState([]);
    const [formData, setFormData] = useState({ title: '', description: '', category: '' });
    const [editingId, setEditingId] = useState(null);
    const [message, setMessage] = useState('');

    // Fetch requests on load
    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await api.get('/requests');
            setRequests(response.data);
        } catch (error) {
            console.error("Failed to fetch requests", error);
            setMessage("Error fetching requests. Are you logged in?");
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                // Update existing request
                await api.put(`/requests/${editingId}`, formData);
                setMessage("Request updated successfully!");
            } else {
                // Create new request
                await api.post('/requests', formData);
                setMessage("Request created successfully!");
            }
            setFormData({ title: '', description: '', category: '' });
            setEditingId(null);
            fetchRequests(); // Refresh the list
        } catch (error) {
            setMessage("Action failed. You might not have permission.");
        }
    };

    const handleEdit = (request) => {
        setFormData({ title: request.title, description: request.description, category: request.category });
        setEditingId(request.id);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this request?")) return;
        try {
            await api.delete(`/requests/${id}`);
            setMessage("Request deleted successfully!");
            fetchRequests(); // Refresh the list
        } catch (error) {
            setMessage("Failed to delete request. It might not belong to you.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login'; // Adjust route to match your login page
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>My Service Requests</h2>
                <button onClick={handleLogout} style={{ padding: '8px 16px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Logout
                </button>
            </div>

            {message && <div style={{ padding: '10px', marginBottom: '20px', background: '#d4edda', color: '#155724', borderRadius: '4px' }}>{message}</div>}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
                <h3>{editingId ? 'Edit Request' : 'Create New Request'}</h3>
                <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleInputChange} required style={{ padding: '8px' }} />
                <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleInputChange} required style={{ padding: '8px' }} />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} required style={{ padding: '8px', minHeight: '80px' }} />
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="submit" style={{ padding: '10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        {editingId ? 'Update Request' : 'Submit Request'}
                    </button>
                    {editingId && (
                        <button type="button" onClick={() => { setEditingId(null); setFormData({ title: '', description: '', category: '' }); }} style={{ padding: '10px', background: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                            Cancel Edit
                        </button>
                    )}
                </div>
            </form>

            <div>
                {requests.length === 0 ? <p>No service requests found.</p> : (
                    requests.map((request) => (
                        <div key={request.id} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '10px', borderRadius: '8px' }}>
                            <h4 style={{ margin: '0 0 10px 0' }}>{request.title} <span style={{ fontSize: '12px', background: '#eee', padding: '3px 8px', borderRadius: '12px', marginLeft: '10px' }}>{request.category}</span></h4>
                            <p style={{ margin: '0 0 10px 0' }}>{request.description}</p>
                            <p style={{ fontSize: '12px', color: '#666' }}>ID: {request.id} | Date: {new Date(request.dateCreated).toLocaleString()}</p>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button onClick={() => handleEdit(request)} style={{ padding: '5px 10px', background: '#ffc107', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                                <button onClick={() => handleDelete(request.id)} style={{ padding: '5px 10px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ServiceRequests;