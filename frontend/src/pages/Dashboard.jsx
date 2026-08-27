import React from 'react';
import ServiceRequests from '../components/ServiceRequests';

const Dashboard = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Dashboard</h1>
            {/* The ServiceRequests component brings its own form, list, and logout button */}
            <ServiceRequests />
        </div>
    );
};

export default Dashboard;