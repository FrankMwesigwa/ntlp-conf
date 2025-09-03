import React, { useState, useEffect } from 'react';

const AdminAbstracts = () => {
    const [abstracts, setAbstracts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        status: '',
        category: '',
        search: ''
    });

    // Mock data - replace with actual API calls
    useEffect(() => {
        const mockAbstracts = [
            {
                id: 1,
                title: "Impact of COVID-19 on Maternal Health Services in Uganda",
                author: "Dr. Sarah Nakamya",
                email: "sarah@example.com",
                category: "Public Health",
                status: "pending",
                submittedDate: "2025-01-15",
                wordCount: 250
            },
            {
                id: 2,
                title: "Innovative Approaches to Neonatal Care in Rural Settings",
                author: "Prof. Michael Ochieng",
                email: "michael@example.com",
                category: "Pediatrics",
                status: "approved",
                submittedDate: "2025-01-14",
                wordCount: 300
            },
            {
                id: 3,
                title: "Digital Health Solutions for Chronic Disease Management",
                author: "Dr. Grace Mwangi",
                email: "grace@example.com",
                category: "Technology",
                status: "rejected",
                submittedDate: "2025-01-13",
                wordCount: 280
            }
        ];
        
        setTimeout(() => {
            setAbstracts(mockAbstracts);
            setLoading(false);
        }, 1000);
    }, []);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const getStatusBadge = (status) => {
        const statusColors = {
            pending: 'warning',
            approved: 'success',
            rejected: 'danger',
            under_review: 'info'
        };
        return <span className={`badge bg-${statusColors[status] || 'secondary'}`}>{status}</span>;
    };

    const filteredAbstracts = abstracts.filter(abstract => {
        const matchesStatus = !filters.status || abstract.status === filters.status;
        const matchesCategory = !filters.category || abstract.category === filters.category;
        const matchesSearch = !filters.search || 
            abstract.title.toLowerCase().includes(filters.search.toLowerCase()) ||
            abstract.author.toLowerCase().includes(filters.search.toLowerCase());
        
        return matchesStatus && matchesCategory && matchesSearch;
    });

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
        <div className="admin-abstracts">
            <div className="page-header mb-3">
                <h3 className="mb-1">Abstract Management</h3>
                <p className="text-muted mb-0" style={{ fontSize: '0.875rem' }}>Review and manage submitted abstracts</p>
            </div>

            {/* Statistics Cards */}
            <div className="row mb-3">
                <div className="col-md-3">
                    <div className="card bg-primary text-white">
                        <div className="card-body py-2">
                            <h6 className="card-title mb-1" style={{ fontSize: '0.8rem' }}>Total Abstracts</h6>
                            <h4 className="mb-0" style={{ fontSize: '1.5rem' }}>{abstracts.length}</h4>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card bg-warning text-white">
                        <div className="card-body py-2">
                            <h6 className="card-title mb-1" style={{ fontSize: '0.8rem' }}>Pending Review</h6>
                            <h4 className="mb-0" style={{ fontSize: '1.5rem' }}>{abstracts.filter(a => a.status === 'pending').length}</h4>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card bg-success text-white">
                        <div className="card-body py-2">
                            <h6 className="card-title mb-1" style={{ fontSize: '0.8rem' }}>Approved</h6>
                            <h4 className="mb-0" style={{ fontSize: '1.5rem' }}>{abstracts.filter(a => a.status === 'approved').length}</h4>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card bg-danger text-white">
                        <div className="card-body py-2">
                            <h6 className="card-title mb-1" style={{ fontSize: '0.8rem' }}>Rejected</h6>
                            <h4 className="mb-0" style={{ fontSize: '1.5rem' }}>{abstracts.filter(a => a.status === 'rejected').length}</h4>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="card mb-3">
                <div className="card-body py-2">
                    <div className="row g-2">
                        <div className="col-md-4">
                            <label className="form-label" style={{ fontSize: '0.8rem' }}>Search</label>
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Search by title or author"
                                value={filters.search}
                                onChange={(e) => handleFilterChange('search', e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label" style={{ fontSize: '0.8rem' }}>Status</label>
                            <select
                                className="form-select form-select-sm"
                                value={filters.status}
                                onChange={(e) => handleFilterChange('status', e.target.value)}
                            >
                                <option value="">All Statuses</option>
                                <option value="pending">Pending</option>
                                <option value="under_review">Under Review</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label" style={{ fontSize: '0.8rem' }}>Category</label>
                            <select
                                className="form-select form-select-sm"
                                value={filters.category}
                                onChange={(e) => handleFilterChange('category', e.target.value)}
                            >
                                <option value="">All Categories</option>
                                <option value="Public Health">Public Health</option>
                                <option value="Pediatrics">Pediatrics</option>
                                <option value="Technology">Technology</option>
                                <option value="Research">Research</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Abstracts Table */}
            <div className="card">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Category</th>
                                    <th>Status</th>
                                    <th>Word Count</th>
                                    <th>Submitted</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAbstracts.map((abstract) => (
                                    <tr key={abstract.id}>
                                        <td>#{abstract.id}</td>
                                        <td>
                                            <div className="abstract-title">
                                                {abstract.title}
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <strong>{abstract.author}</strong>
                                                <br />
                                                <small className="text-muted">{abstract.email}</small>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="badge bg-secondary">
                                                {abstract.category}
                                            </span>
                                        </td>
                                        <td>{getStatusBadge(abstract.status)}</td>
                                        <td>{abstract.wordCount}</td>
                                        <td>{new Date(abstract.submittedDate).toLocaleDateString()}</td>
                                        <td>
                                            <div className="btn-group" role="group">
                                                <button 
                                                    className="btn btn-sm btn-outline-primary"
                                                    title="View Abstract"
                                                >
                                                    <i className="fas fa-eye"></i>
                                                </button>
                                                <button 
                                                    className="btn btn-sm btn-outline-success"
                                                    title="Approve"
                                                    disabled={abstract.status === 'approved'}
                                                >
                                                    <i className="fas fa-check"></i>
                                                </button>
                                                <button 
                                                    className="btn btn-sm btn-outline-danger"
                                                    title="Reject"
                                                    disabled={abstract.status === 'rejected'}
                                                >
                                                    <i className="fas fa-times"></i>
                                                </button>
                                                <button 
                                                    className="btn btn-sm btn-outline-info"
                                                    title="Download"
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

                    {filteredAbstracts.length === 0 && (
                        <div className="text-center py-4">
                            <p className="text-muted">No abstracts found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .admin-abstracts {
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

                .abstract-title {
                    max-width: 300px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
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
            `}</style>
        </div>
    );
};

export default AdminAbstracts;
