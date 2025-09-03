import React from 'react';
import RegistrationDashboard from '../../components/RegistrationDashboard';

const AdminRegistrations = () => {
    return (
        <div className="admin-registrations">
            <div className="page-header mb-3">
                <h3 className="mb-1">Registration Management</h3>
                <p className="text-muted mb-0" style={{ fontSize: '0.875rem' }}>View and manage all conference registrations</p>
            </div>
            
            <RegistrationDashboard />
        </div>
    );
};

export default AdminRegistrations;
