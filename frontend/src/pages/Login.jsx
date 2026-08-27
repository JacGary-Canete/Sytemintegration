import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axiosConfig';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/login', credentials);
            localStorage.setItem('token', response.data.token); // Save JWT
            navigate('/dashboard'); // Go to protected page
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center', fontFamily: 'sans-serif' }}>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required style={{ padding: '10px' }} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required style={{ padding: '10px' }} />
                <button type="submit" style={{ padding: '10px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>Login</button>
            </form>
            <p style={{ marginTop: '15px' }}>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
    );
};

export default Login;