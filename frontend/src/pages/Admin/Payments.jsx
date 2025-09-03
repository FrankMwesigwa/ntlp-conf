import React, { useState, useEffect } from 'react';
import API from '../../helpers/api';

const AdminPayments = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        status: '',
        registrationType: '',
        search: '',
        dateFrom: '',
        dateTo: ''
    });

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        try {
            setLoading(true);
            // Fetch registrations with payment information
            const response = await API.get('/registrations');
            const registrations = response.data.registrations || response.data;
            
            // Transform registrations to payment records
            const paymentRecords = registrations.map(reg => ({
                id: reg.id,
                paymentReference: reg.paymentReference,
                registrantName: `${reg.firstName} ${reg.lastName}`,
                email: reg.email,
                registrationType: reg.registrationType,
                registrationFee: reg.registrationFee,
                currency: reg.currency,
                paymentStatus: reg.paymentStatus,
                registrationStatus: reg.registrationStatus,
                createdAt: reg.createdAt,
                updatedAt: reg.updatedAt
            }));
            
            setPayments(paymentRecords);
        } catch (err) {
            console.error('Failed to fetch payments:', err);
            setError('Failed to load payment data');
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const getStatusBadge = (status) => {
        const statusColors = {
            paid: 'success',
            pending: 'warning',
            failed: 'danger',
            refunded: 'info'
        };
        return <span className={`badge bg-${statusColors[status] || 'secondary'}`}>{status}</span>;
    };

    const getRegistrationTypeBadge = (type) => {
        const typeColors = {
            local: 'primary',
            regional: 'info',
            international: 'secondary'
        };
        return <span className={`badge bg-${typeColors[type] || 'secondary'}`}>{type}</span>;
    };

    const filteredPayments = payments.filter(payment => {
        const matchesStatus = !filters.status || payment.paymentStatus === filters.status;
        const matchesType = !filters.registrationType || payment.registrationType === filters.registrationType;
        const matchesSearch = !filters.search || 
            payment.registrantName.toLowerCase().includes(filters.search.toLowerCase()) ||
            payment.email.toLowerCase().includes(filters.search.toLowerCase()) ||
            payment.paymentReference.toLowerCase().includes(filters.search.toLowerCase());
        
        const paymentDate = new Date(payment.createdAt);
        const matchesDateFrom = !filters.dateFrom || paymentDate >= new Date(filters.dateFrom);
        const matchesDateTo = !filters.dateTo || paymentDate <= new Date(filters.dateTo);
        
        return matchesStatus && matchesType && matchesSearch && matchesDateFrom && matchesDateTo;
    });

    const totalRevenue = payments
        .filter(p => p.paymentStatus === 'paid')
        .reduce((sum, p) => sum + (p.registrationFee || 0), 0);

    const pendingAmount = payments
        .filter(p => p.paymentStatus === 'pending')
        .reduce((sum, p) => sum + (p.registrationFee || 0), 0);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-payments">
            <div className="page-header mb-3">
                <h3 className="mb-1">Payment Management</h3>
                <p className="text-muted mb-0" style={{ fontSize: '0.875rem' }}>Track and manage conference payments</p>
            </div>

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            {/* Statistics Cards */}
            <div className="row mb-3">
                <div className="col-md-3">
                    <div className="card bg-success text-white">
                        <div className="card-body py-2">
                            <h6 className="card-title mb-1" style={{ fontSize: '0.8rem' }}>Total Revenue</h6>
                            <h4 className="mb-0" style={{ fontSize: '1.5rem' }}>UGX {totalRevenue.toLocaleString()}</h4>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card bg-warning text-white">
                        <div className="card-body py-2">
                            <h6 className="card-title mb-1" style={{ fontSize: '0.8rem' }}>Pending Payments</h6>
                            <h4 className="mb-0" style={{ fontSize: '1.5rem' }}>UGX {pendingAmount.toLocaleString()}</h4>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card bg-primary text-white">
                        <div className="card-body py-2">
                            <h6 className="card-title mb-1" style={{ fontSize: '0.8rem' }}>Paid Registrations</h6>
                            <h4 className="mb-0" style={{ fontSize: '1.5rem' }}>{payments.filter(p => p.paymentStatus === 'paid').length}</h4>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card bg-danger text-white">
                        <div className="card-body py-2">
                            <h6 className="card-title mb-1" style={{ fontSize: '0.8rem' }}>Failed Payments</h6>
                            <h4 className="mb-0" style={{ fontSize: '1.5rem' }}>{payments.filter(p => p.paymentStatus === 'failed').length}</h4>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="card mb-3">
                <div className="card-body py-2">
                    <div className="row g-2">
                        <div className="col-md-3">
                            <label className="form-label" style={{ fontSize: '0.8rem' }}>Search</label>
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Search by name, email, or reference"
                                value={filters.search}
                                onChange={(e) => handleFilterChange('search', e.target.value)}
                            />
                        </div>
                        <div className="col-md-2">
                            <label className="form-label" style={{ fontSize: '0.8rem' }}>Payment Status</label>
                            <select
                                className="form-select form-select-sm"
                                value={filters.status}
                                onChange={(e) => handleFilterChange('status', e.target.value)}
                            >
                                <option value="">All Statuses</option>
                                <option value="paid">Paid</option>
                                <option value="pending">Pending</option>
                                <option value="failed">Failed</option>
                                <option value="refunded">Refunded</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <label className="form-label" style={{ fontSize: '0.8rem' }}>Registration Type</label>
                            <select
                                className="form-select form-select-sm"
                                value={filters.registrationType}
                                onChange={(e) => handleFilterChange('registrationType', e.target.value)}
                            >
                                <option value="">All Types</option>
                                <option value="local">Local</option>
                                <option value="regional">Regional</option>
                                <option value="international">International</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <label className="form-label" style={{ fontSize: '0.8rem' }}>From Date</label>
                            <input
                                type="date"
                                className="form-control form-control-sm"
                                value={filters.dateFrom}
                                onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                            />
                        </div>
                        <div className="col-md-2">
                            <label className="form-label" style={{ fontSize: '0.8rem' }}>To Date</label>
                            <input
                                type="date"
                                className="form-control form-control-sm"
                                value={filters.dateTo}
                                onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                            />
                        </div>
                        <div className="col-md-1">
                            <label className="form-label" style={{ fontSize: '0.8rem' }}>&nbsp;</label>
                            <button 
                                className="btn btn-outline-secondary btn-sm w-100"
                                onClick={() => setFilters({
                                    status: '',
                                    registrationType: '',
                                    search: '',
                                    dateFrom: '',
                                    dateTo: ''
                                })}
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payments Table */}
            <div className="card">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Reference</th>
                                    <th>Registrant</th>
                                    <th>Email</th>
                                    <th>Type</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Registration</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPayments.map((payment) => (
                                    <tr key={payment.id}>
                                        <td>
                                            <code>{payment.paymentReference}</code>
                                        </td>
                                        <td>
                                            <strong>{payment.registrantName}</strong>
                                        </td>
                                        <td>{payment.email}</td>
                                        <td>{getRegistrationTypeBadge(payment.registrationType)}</td>
                                        <td>
                                            <strong>{payment.currency} {payment.registrationFee?.toLocaleString()}</strong>
                                        </td>
                                        <td>{getStatusBadge(payment.paymentStatus)}</td>
                                        <td>
                                            <span className={`badge bg-${payment.registrationStatus === 'confirmed' ? 'success' : 'warning'}`}>
                                                {payment.registrationStatus}
                                            </span>
                                        </td>
                                        <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <div className="btn-group" role="group">
                                                <button 
                                                    className="btn btn-sm btn-outline-primary"
                                                    title="View Details"
                                                >
                                                    <i className="fas fa-eye"></i>
                                                </button>
                                                {payment.paymentStatus === 'pending' && (
                                                    <button 
                                                        className="btn btn-sm btn-outline-success"
                                                        title="Mark as Paid"
                                                    >
                                                        <i className="fas fa-check"></i>
                                                    </button>
                                                )}
                                                {payment.paymentStatus === 'paid' && (
                                                    <button 
                                                        className="btn btn-sm btn-outline-warning"
                                                        title="Refund"
                                                    >
                                                        <i className="fas fa-undo"></i>
                                                    </button>
                                                )}
                                                <button 
                                                    className="btn btn-sm btn-outline-info"
                                                    title="Download Receipt"
                                                >
                                                    <i className="fas fa-download"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredPayments.length === 0 && (
                        <div className="text-center py-4">
                            <p className="text-muted">No payments found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Export Options */}
            <div className="row mt-3">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body py-2">
                            <h6 className="card-title mb-2" style={{ fontSize: '0.9rem' }}>Export Options</h6>
                            <div className="btn-group" role="group">
                                <button className="btn btn-outline-primary btn-sm">
                                    <i className="fas fa-file-excel"></i> Export to Excel
                                </button>
                                <button className="btn btn-outline-secondary btn-sm">
                                    <i className="fas fa-file-pdf"></i> Export to PDF
                                </button>
                                <button className="btn btn-outline-info btn-sm">
                                    <i className="fas fa-file-csv"></i> Export to CSV
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .admin-payments {
                    padding: 0;
                }

                .page-header h3 {
                    color: #2c3e50;
                    margin-bottom: 0.25rem;
                    font-size: 1.25rem;
                }

                .card {
                    border: none;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }

                .btn-group .btn {
                    margin-right: 0.25rem;
                }

                .btn-group .btn:last-child {
                    margin-right: 0;
                }

                .badge {
                    font-size: 0.7rem;
                }

                .table th {
                    border-top: none;
                    font-weight: 600;
                    color: #495057;
                    font-size: 0.8rem;
                }

                .table td {
                    vertical-align: middle;
                    font-size: 0.8rem;
                }

                code {
                    background: #f8f9fa;
                    padding: 0.25rem 0.5rem;
                    border-radius: 0.25rem;
                    font-size: 0.8rem;
                }
            `}</style>
        </div>
    );
};

export default AdminPayments;
