import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axiosConfig';

const Register = () => {
    const [user, setUser] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/register', user);
            alert('Registration successful! You can now log in.');
            navigate('/login');
        } catch (err) {
            setError('Registration failed. Username might be taken.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center', fontFamily: 'sans-serif' }}>
            <h2>Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required style={{ padding: '10px' }} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required style={{ padding: '10px' }} />
                <button type="submit" style={{ padding: '10px', background: '#28a745', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>Register</button>
            </form>
            <p style={{ marginTop: '15px' }}>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
    );
};

export default Register;