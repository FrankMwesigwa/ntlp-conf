import React, { useState, useEffect } from 'react';
import API from '../helpers/api';

const RegistrationDashboard = () => {
    const [registrations, setRegistrations] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        page: 1,
        limit: 10,
        registrationType: '',
        paymentStatus: '',
        registrationStatus: '',
        search: ''
    });

    useEffect(() => {
        fetchRegistrations();
        fetchStats();
    }, [filters]);

    const fetchRegistrations = async () => {
        try {
            setLoading(true);
            const queryParams = new URLSearchParams(filters).toString();
            const response = await API.get(`/registrations?${queryParams}`);
            setRegistrations(response.data.registrations);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch registrations:', err);
            setError('Failed to fetch registrations');
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await API.get('/registrations/stats/overview');
            setStats(response.data);
        } catch (err) {
            console.error('Failed to fetch stats:', err);
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value,
            page: 1 // Reset to first page when filters change
        }));
    };

    const formatCurrency = (amount, currency) => {
        if (currency === 'USD') {
            return `$${amount}`;
        }
        return `UGX ${amount.toLocaleString()}`;
    };

    const getStatusBadge = (status, type) => {
        const statusColors = {
            pending: 'warning',
            confirmed: 'success',
            cancelled: 'danger',
            paid: 'success',
            failed: 'danger',
            refunded: 'info'
        };

        const color = statusColors[status] || 'secondary';
        return <span className={`badge bg-${color}`}>{status}</span>;
    };

    if (loading && registrations.length === 0) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="registration-dashboard">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <h2 className="mb-4">Registration Dashboard</h2>
                        
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}

                        {/* Statistics Cards */}
                        {stats && (
                            <div className="row mb-4">
                                <div className="col-md-3">
                                    <div className="card bg-primary text-white">
                                        <div className="card-body">
                                            <h5 className="card-title">Total Registrations</h5>
                                            <h3>{stats.totalRegistrations}</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="card bg-success text-white">
                                        <div className="card-body">
                                            <h5 className="card-title">Confirmed</h5>
                                            <h3>
                                                {stats.byStatus.find(s => s.registrationStatus === 'confirmed')?.count || 0}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="card bg-warning text-white">
                                        <div className="card-body">
                                            <h5 className="card-title">Pending Payment</h5>
                                            <h3>
                                                {stats.byPayment.find(p => p.paymentStatus === 'pending')?.count || 0}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="card bg-info text-white">
                                        <div className="card-body">
                                            <h5 className="card-title">Paid</h5>
                                            <h3>
                                                {stats.byPayment.find(p => p.paymentStatus === 'paid')?.count || 0}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Filters */}
                        <div className="card mb-4">
                            <div className="card-body">
                                <div className="row g-3">
                                    <div className="col-md-3">
                                        <label className="form-label">Search</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Name, email, or organization"
                                            value={filters.search}
                                            onChange={(e) => handleFilterChange('search', e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <label className="form-label">Registration Type</label>
                                        <select
                                            className="form-select"
                                            value={filters.registrationType}
                                            onChange={(e) => handleFilterChange('registrationType', e.target.value)}
                                        >
                                            <option value="">All Types</option>
                                            <option value="international">International</option>
                                            <option value="regional">Regional</option>
                                            <option value="local">Local</option>
                                            <option value="student">Student</option>
                                        </select>
                                    </div>
                                    <div className="col-md-2">
                                        <label className="form-label">Payment Status</label>
                                        <select
                                            className="form-select"
                                            value={filters.paymentStatus}
                                            onChange={(e) => handleFilterChange('paymentStatus', e.target.value)}
                                        >
                                            <option value="">All Statuses</option>
                                            <option value="pending">Pending</option>
                                            <option value="paid">Paid</option>
                                            <option value="failed">Failed</option>
                                            <option value="refunded">Refunded</option>
                                        </select>
                                    </div>
                                    <div className="col-md-2">
                                        <label className="form-label">Registration Status</label>
                                        <select
                                            className="form-select"
                                            value={filters.registrationStatus}
                                            onChange={(e) => handleFilterChange('registrationStatus', e.target.value)}
                                        >
                                            <option value="">All Statuses</option>
                                            <option value="pending">Pending</option>
                                            <option value="confirmed">Confirmed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                    <div className="col-md-2">
                                        <label className="form-label">Per Page</label>
                                        <select
                                            className="form-select"
                                            value={filters.limit}
                                            onChange={(e) => handleFilterChange('limit', parseInt(e.target.value))}
                                        >
                                            <option value={10}>10</option>
                                            <option value={25}>25</option>
                                            <option value={50}>50</option>
                                            <option value={100}>100</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Registrations Table */}
                        <div className="card">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Organization</th>
                                                <th>Type</th>
                                                <th>Fee</th>
                                                <th>Payment Status</th>
                                                <th>Registration Status</th>
                                                <th>Date</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {registrations.map((registration) => (
                                                <tr key={registration.id}>
                                                    <td>#{registration.id}</td>
                                                    <td>
                                                        {registration.title} {registration.firstName} {registration.lastName}
                                                    </td>
                                                    <td>{registration.email}</td>
                                                    <td>{registration.organization}</td>
                                                    <td>
                                                        <span className="badge bg-secondary">
                                                            {registration.registrationType}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        {formatCurrency(registration.registrationFee, registration.currency)}
                                                    </td>
                                                    <td>{getStatusBadge(registration.paymentStatus, 'payment')}</td>
                                                    <td>{getStatusBadge(registration.registrationStatus, 'registration')}</td>
                                                    <td>
                                                        {new Date(registration.createdAt).toLocaleDateString()}
                                                    </td>
                                                    <td>
                                                        <button 
                                                            className="btn btn-sm btn-outline-primary"
                                                            onClick={() => {
                                                                // View details modal or navigate to details page
                                                                console.log('View registration:', registration.id);
                                                            }}
                                                        >
                                                            View
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {registrations.length === 0 && !loading && (
                                    <div className="text-center py-4">
                                        <p className="text-muted">No registrations found matching your criteria.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationDashboard;
